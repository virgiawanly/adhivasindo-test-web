import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { Tool } from '../../../../../../types/tools';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MDModalModule } from '../../../../../shared/components/modals';
import { ModalService } from '../../../../../shared/components/modals/modal.service';
import { ToolForm } from '../tool-form/tool-form';
import { ToolFormComponent } from '../tool-form/tool-form.component';

@Component({
  selector: 'app-tool-create-modal',
  standalone: true,
  imports: [MDModalModule, LucideAngularModule, CommonModule, FormsModule, TranslateModule, ToolFormComponent],
  templateUrl: './tool-create-modal.component.html',
  styleUrl: './tool-create-modal.component.scss',
})
export class ToolCreateModalComponent {
  @Input({ required: true }) modalId?: string;
  @Output() created: EventEmitter<Tool> = new EventEmitter<Tool>();

  isSubmitting: boolean = false;
  toolForm: ToolForm = new ToolForm();

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _modalService: ModalService,
    private _translateService: TranslateService
  ) {}

  submit() {
    this.toolForm.markAllAsTouched();

    if (this.toolForm.invalid || this.toolForm.disabled || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.toolForm.disable();
    this._httpService
      .post('admin-panel/tools', this._httpService.convertToFormData(this.toolForm.value))
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('state.success'));
          this.created.emit(res.data);
          this.toolForm.reset();
          this._modalService.close(this.modalId!);
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('state.failed'));
          }
        },
      })
      .add(() => {
        this.toolForm.enable();
        this.isSubmitting = false;
      });
  }
}
