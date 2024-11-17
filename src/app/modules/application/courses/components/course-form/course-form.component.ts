import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Course } from '../../../../../../types/courses';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { Tool } from '../../../../../../types/tools';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { CourseCompetencyForm, CourseForm } from './course-form';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TranslateModule, LucideAngularModule, NgSelectModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit, OnDestroy, OnChanges {
  private _unsubscribeAll$: Subject<void> = new Subject<void>();

  @Input({ required: true }) form: CourseForm = new CourseForm();
  @Input({ required: false }) course?: Course | null;
  @Output() formSubmit: EventEmitter<CourseForm> = new EventEmitter<CourseForm>();

  toolOptions: Tool[] = [];
  searchToolListener$: Subject<string> = new Subject();

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  get competencies(): FormArray {
    return this.form.get('competencies') as FormArray;
  }

  ngOnInit() {
    this.searchToolListener$.pipe(debounceTime(300), takeUntil(this._unsubscribeAll$)).subscribe((search) => {
      if (search.length) {
        this.getToolOptions(search);
      } else {
        this.toolOptions = [];
      }
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'] && this.course) {
      this.toolOptions = this.course?.tools ?? [];
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.form.patchValue({ image: event.target.files[0] });
    }
  }

  submit() {
    this.formSubmit.emit(this.form);
  }

  addCompetency() {
    this.competencies.push(new CourseCompetencyForm(null));
  }

  removeCompetency(index: number) {
    if (this.competencies.length > 1) {
      this.competencies.removeAt(index);
    }
  }

  getToolOptions(term: string = '') {
    this._httpService
      .get('admin-panel/tools', {
        params: {
          search: term,
        },
      })
      .subscribe({
        next: (res: any) => {
          this.toolOptions = res.data.data;
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('state.failed'));
          }
        },
      });
  }
}
