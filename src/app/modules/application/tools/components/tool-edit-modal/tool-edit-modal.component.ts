import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  selector: 'app-tool-edit-modal',
  standalone: true,
  imports: [MDModalModule, LucideAngularModule, CommonModule, FormsModule, TranslateModule, ToolFormComponent],
  templateUrl: './tool-edit-modal.component.html',
  styleUrl: './tool-edit-modal.component.scss',
})
export class ToolEditModalComponent implements OnChanges {
  @Input({ required: true }) tool?: Tool | null;
  @Input({ required: true }) modalId?: string;
  @Output() updated: EventEmitter<Tool> = new EventEmitter<Tool>();

  isSubmitting: boolean = false;
  toolForm: ToolForm = new ToolForm(this.tool);

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _modalService: ModalService,
    private _translateService: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tool'] && this.tool) {
      this.toolForm = new ToolForm(this.tool);
    }
  }

  submit() {
    this.toolForm.markAllAsTouched();

    if (!this.tool || this.toolForm.invalid || this.toolForm.disabled || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.toolForm.disable();
    this._httpService
      .post(`admin-panel/tools/${this.tool.id}`, this._httpService.convertToFormData(this.toolForm.value), {
        params: {
          _method: 'PATCH',
        },
      })
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('state.success'));
          this.updated.emit(res.data);
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
