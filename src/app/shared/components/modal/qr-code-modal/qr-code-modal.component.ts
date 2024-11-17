import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { MDModalModule } from '../../modals';
import { ModalService } from '../../modals/modal.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-qr-code-modal',
  standalone: true,
  imports: [MDModalModule, CommonModule, QRCodeModule, LucideAngularModule],
  templateUrl: './qr-code-modal.component.html',
  styleUrl: './qr-code-modal.component.scss',
})
export class QrCodeModalComponent {
  @Input({ required: true }) modalId?: string;
  @Input({ required: false }) modalTitle?: string;
  @Input({ required: true }) qrdata?: string;

  constructor(private _modalService: ModalService) {}
}
