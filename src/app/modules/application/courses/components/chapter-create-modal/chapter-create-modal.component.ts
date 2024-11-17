import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Chapter } from '../../../../../../types/chapters';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MDModalModule } from '../../../../../shared/components/modals';
import { ModalService } from '../../../../../shared/components/modals/modal.service';
import { ChapterForm } from '../chapter-form/chapter-form';
import { ChapterFormComponent } from '../chapter-form/chapter-form.component';

@Component({
  selector: 'app-chapter-create-modal',
  standalone: true,
  imports: [MDModalModule, LucideAngularModule, CommonModule, FormsModule, TranslateModule, ChapterFormComponent],
  templateUrl: './chapter-create-modal.component.html',
  styleUrl: './chapter-create-modal.component.scss',
})
export class ChapterCreateModalComponent {
  @Input({ required: true }) modalId?: string;
  @Input({ required: true }) courseId?: number;
  @Output() created: EventEmitter<Chapter> = new EventEmitter<Chapter>();

  isSubmitting: boolean = false;
  chapterForm: ChapterForm = new ChapterForm();

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _modalService: ModalService,
    private _translateService: TranslateService
  ) {}

  submit() {
    if (!this.courseId) {
      return;
    }

    this.chapterForm.markAllAsTouched();

    if (this.chapterForm.invalid || this.chapterForm.disabled || this.isSubmitting) {
      return;
    }

    const payload = this.chapterForm.value;
    payload.course_id = this.courseId;

    this.isSubmitting = true;
    this.chapterForm.disable();
    this._httpService
      .post('admin-panel/chapters', payload)
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('state.success'));
          this.created.emit(res.data);
          this.chapterForm.reset();
          this._modalService.close(this.modalId!);
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('state.failed'));
          }
        },
      })
      .add(() => {
        this.chapterForm.enable();
        this.isSubmitting = false;
      });
  }
}
