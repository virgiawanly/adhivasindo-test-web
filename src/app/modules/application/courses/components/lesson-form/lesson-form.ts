import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lesson } from '../../../../../../types/lessons';

export class LessonForm extends FormGroup {
  constructor(lesson?: Lesson | null) {
    super({
      title: new FormControl(lesson?.title ?? '', [Validators.required, Validators.maxLength(255)]),
      type: new FormControl(lesson?.type ?? 'video', [Validators.required]),
      video_url: new FormControl(lesson?.video_url ?? '', []),
      text_content: new FormControl(lesson?.text_content ?? '', []),
    });
  }
}
