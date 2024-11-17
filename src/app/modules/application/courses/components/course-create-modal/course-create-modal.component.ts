import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Course } from '../../../../../../types/courses';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MDModalModule } from '../../../../../shared/components/modals';
import { ModalService } from '../../../../../shared/components/modals/modal.service';
import { CourseForm } from '../course-form/course-form';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-create-modal',
  standalone: true,
  imports: [MDModalModule, LucideAngularModule, CommonModule, FormsModule, TranslateModule, CourseFormComponent],
  templateUrl: './course-create-modal.component.html',
  styleUrl: './course-create-modal.component.scss',
})
export class CourseCreateModalComponent {
  @Input({ required: true }) modalId?: string;
  @Output() created: EventEmitter<Course> = new EventEmitter<Course>();

  isSubmitting: boolean = false;
  courseForm: CourseForm = new CourseForm();

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _modalService: ModalService,
    private _translateService: TranslateService
  ) {}

  submit() {
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid || this.courseForm.disabled || this.isSubmitting) {
      return;
    }

    const formData = this._httpService.convertToFormData(this.courseForm.value);
    const competencies = this.courseForm.get('competencies')?.value ?? [];

    competencies.forEach((competency: { id?: number | null; name: string }, index: number) => {
      formData.append(`competencies[${index}][id]`, (competency?.id ?? '').toString());
      formData.append(`competencies[${index}][name]`, competency.name);
    });

    this.isSubmitting = true;
    this.courseForm.disable();
    this._httpService
      .post('admin-panel/courses', formData)
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('state.success'));
          this.created.emit(res.data);
          this.courseForm.reset();
          this._modalService.close(this.modalId!);
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('state.failed'));
          }
        },
      })
      .add(() => {
        this.courseForm.enable();
        this.isSubmitting = false;
      });
  }
}
