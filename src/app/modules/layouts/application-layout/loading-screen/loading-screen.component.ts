import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
  animations: [trigger('fadeOut', [transition(':leave', [animate('500ms ease-in', style({ opacity: 0 }))])])],
})
export class LoadingScreenComponent implements OnChanges {
  @Input({ required: true }) isOpen: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }
}
