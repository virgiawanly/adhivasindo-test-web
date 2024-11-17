import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { Lesson } from '../../../../../../types/lessons';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MDModalModule } from '../../../../../shared/components/modals';
import { ModalService } from '../../../../../shared/components/modals/modal.service';
import { LessonForm } from '../lesson-form/lesson-form';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';

@Component({
  selector: 'app-lesson-edit-modal',
  standalone: true,
  imports: [MDModalModule, LucideAngularModule, CommonModule, FormsModule, TranslateModule, LessonFormComponent],
  templateUrl: './lesson-edit-modal.component.html',
  styleUrl: './lesson-edit-modal.component.scss',
})
export class LessonEditModalComponent implements OnChanges {
  @Input({ required: true }) courseId?: number;
  @Input({ required: true }) chapterId?: number;
  @Input({ required: true }) lesson?: Lesson | null;
  @Input({ required: true }) modalId?: string;
  @Output() updated: EventEmitter<Lesson> = new EventEmitter<Lesson>();

  isSubmitting: boolean = false;
  lessonForm: LessonForm = new LessonForm(this.lesson);

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _modalService: ModalService,
    private _translateService: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lesson'] && this.lesson) {
      this.lessonForm = new LessonForm(this.lesson);
    }
  }

  submit() {
    if (!this.chapterId) {
      return;
    }

    this.lessonForm.markAllAsTouched();

    if (!this.lesson || this.lessonForm.invalid || this.lessonForm.disabled || this.isSubmitting) {
      return;
    }

    const payload = this.lessonForm.value;
    payload.course_id = this.courseId;
    payload.chapter_id = this.chapterId;

    this.isSubmitting = true;
    this.lessonForm.disable();
    this._httpService
      .post(`admin-panel/lessons/${this.lesson.id}`, payload, {
        params: {
          _method: 'PATCH',
        },
      })
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('state.success'));
          this.updated.emit(res.data);
          this.lessonForm.reset();
          this._modalService.close(this.modalId!);
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('state.failed'));
          }
        },
      })
      .add(() => {
        this.lessonForm.enable();
        this.isSubmitting = false;
      });
  }
}
