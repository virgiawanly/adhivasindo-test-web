import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chapter } from '../../../../../../types/chapters';

export class ChapterForm extends FormGroup {
  constructor(chapter?: Chapter | null) {
    super({
      title: new FormControl(chapter?.title ?? '', [Validators.required, Validators.maxLength(255)]),
    });
  }
}
