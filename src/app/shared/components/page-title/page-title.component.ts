import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent {
  @Input() title: string | undefined;
  @Input() pagetitle: string | undefined;
  @Input() pagetitleurl: string | undefined;
  @Input() backbuttonurl: string | undefined;
}
