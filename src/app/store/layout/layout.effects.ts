import { Inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class LayoutEffects {
  constructor(@Inject(Actions) private actions$: Actions) {}
}
