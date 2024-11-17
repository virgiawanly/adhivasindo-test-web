import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Tool } from '../../../../../../types/tools';
import { ToolForm } from './tool-form';

@Component({
  selector: 'app-tool-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './tool-form.component.html',
  styleUrl: './tool-form.component.scss',
})
export class ToolFormComponent {
  @Input({ required: true }) form: ToolForm = new ToolForm();
  @Input({ required: false }) tool?: Tool | null;
  @Output() formSubmit: EventEmitter<ToolForm> = new EventEmitter<ToolForm>();

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.form.patchValue({ image: event.target.files[0] });
    }
  }

  submit() {
    this.formSubmit.emit(this.form);
  }
}
