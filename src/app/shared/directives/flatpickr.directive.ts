import { Directive, ElementRef, Input } from '@angular/core';
import flatpickr from 'flatpickr';
import { Options } from 'flatpickr/dist/types/options';

@Directive({
  selector: '[appFlatpickr]',
  standalone: true,
})
export class FlatpickrDirective {
  @Input() flatpickrOptions: Options = {};

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initFlatpickr();
  }

  private initFlatpickr() {
    flatpickr(this.el.nativeElement, this.flatpickrOptions);
  }
}
