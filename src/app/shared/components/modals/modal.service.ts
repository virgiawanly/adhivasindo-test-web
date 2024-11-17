import { Injectable } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modals$ = new Subject<{ [key: string]: boolean }>();
  private modals: { [key: string]: boolean } = {};

  constructor() {}

  open(id: string) {
    this.modals[id] = true;
    this._modals$.next(this.modals);
  }

  close(id: string) {
    this.modals[id] = false;
    this._modals$.next(this.modals);
  }

  isOpen(id: string) {
    return this.modals[id];
  }

  isOpenObservable(id: string) {
    return this._modals$.asObservable().pipe(map((modals) => modals[id]));
  }
}
