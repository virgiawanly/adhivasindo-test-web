import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Chapter } from '../../../../../../types/chapters';
import { ChapterForm } from './chapter-form';

@Component({
  selector: 'app-chapter-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './chapter-form.component.html',
  styleUrl: './chapter-form.component.scss',
})
export class ChapterFormComponent {
  @Input({ required: true }) form: ChapterForm = new ChapterForm();
  @Input({ required: false }) chapter?: Chapter | null;
  @Output() formSubmit: EventEmitter<ChapterForm> = new EventEmitter<ChapterForm>();

  submit() {
    this.formSubmit.emit(this.form);
  }
}
