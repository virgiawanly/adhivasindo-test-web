import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-lesson-create-modal',
  standalone: true,
  imports: [MDModalModule, LucideAngularModule, CommonModule, FormsModule, TranslateModule, LessonFormComponent],
  templateUrl: './lesson-create-modal.component.html',
  styleUrl: './lesson-create-modal.component.scss',
})
export class LessonCreateModalComponent {
  @Input({ required: true }) modalId?: string;
  @Input({ required: true }) courseId?: number;
  @Input({ required: true }) chapterId?: number;
  @Output() created: EventEmitter<Lesson> = new EventEmitter<Lesson>();

  isSubmitting: boolean = false;
  lessonForm: LessonForm = new LessonForm();

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _modalService: ModalService,
    private _translateService: TranslateService
  ) {}

  submit() {
    if (!this.chapterId || !this.courseId) {
      return;
    }

    this.lessonForm.markAllAsTouched();

    if (this.lessonForm.invalid || this.lessonForm.disabled || this.isSubmitting) {
      return;
    }

    const payload = this.lessonForm.value;
    payload.course_id = this.courseId;
    payload.chapter_id = this.chapterId;

    this.isSubmitting = true;
    this.lessonForm.disable();
    this._httpService
      .post('admin-panel/lessons', payload)
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('state.success'));
          this.created.emit(res.data);
          this.lessonForm.reset();
          this.lessonForm.patchValue({ type: 'video' });
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
