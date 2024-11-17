import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  selector: 'app-chapter-edit-modal',
  standalone: true,
  imports: [MDModalModule, LucideAngularModule, CommonModule, FormsModule, TranslateModule, ChapterFormComponent],
  templateUrl: './chapter-edit-modal.component.html',
  styleUrl: './chapter-edit-modal.component.scss',
})
export class ChapterEditModalComponent implements OnChanges {
  @Input({ required: true }) courseId?: number;
  @Input({ required: true }) chapter?: Chapter | null;
  @Input({ required: true }) modalId?: string;
  @Output() updated: EventEmitter<Chapter> = new EventEmitter<Chapter>();

  isSubmitting: boolean = false;
  chapterForm: ChapterForm = new ChapterForm(this.chapter);

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _modalService: ModalService,
    private _translateService: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chapter'] && this.chapter) {
      this.chapterForm = new ChapterForm(this.chapter);
    }
  }

  submit() {
    if (!this.courseId) {
      return;
    }

    this.chapterForm.markAllAsTouched();

    if (!this.chapter || this.chapterForm.invalid || this.chapterForm.disabled || this.isSubmitting) {
      return;
    }

    const payload = this.chapterForm.value;
    payload.course_id = this.courseId;

    this.isSubmitting = true;
    this.chapterForm.disable();
    this._httpService
      .post(`admin-panel/chapters/${this.chapter.id}`, payload, {
        params: {
          _method: 'PATCH',
        },
      })
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('state.success'));
          this.updated.emit(res.data);
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
