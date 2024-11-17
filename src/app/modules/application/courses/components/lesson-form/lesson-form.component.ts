import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Lesson } from '../../../../../../types/lessons';
import { LessonForm } from './lesson-form';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.scss',
})
export class LessonFormComponent implements OnInit, OnDestroy {
  private _unsubscribeAll$: Subject<void> = new Subject<void>();

  @Input({ required: true }) form: LessonForm = new LessonForm();
  @Input({ required: false }) lesson?: Lesson | null;
  @Output() formSubmit: EventEmitter<LessonForm> = new EventEmitter<LessonForm>();

  submit() {
    this.formSubmit.emit(this.form);
  }

  ngOnInit(): void {
    this.form
      .get('type')
      ?.valueChanges.pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((value) => {
        this.updateVideoUrlValidation(value);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

  updateVideoUrlValidation(type: string): void {
    const textContentControl = this.form.get('text_content');
    const videoUrlControl = this.form.get('video_url');

    if (type === 'video') {
      videoUrlControl?.setValidators([Validators.required]);
      textContentControl?.clearValidators();
    } else {
      videoUrlControl?.clearValidators();
      textContentControl?.setValidators([Validators.required]);
    }

    videoUrlControl?.updateValueAndValidity();
    textContentControl?.updateValueAndValidity();
  }
}
