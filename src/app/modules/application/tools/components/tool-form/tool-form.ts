import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tool } from '../../../../../../types/tools';

export class ToolForm extends FormGroup {
  constructor(tool?: Tool | null) {
    super({
      name: new FormControl(tool?.name ?? '', [Validators.required, Validators.maxLength(255)]),
      image: new FormControl('', !tool ? [Validators.required] : []),
    });
  }
}
