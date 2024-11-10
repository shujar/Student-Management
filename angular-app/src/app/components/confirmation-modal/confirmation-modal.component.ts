import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  @Output() response: EventEmitter<boolean> = new EventEmitter<boolean>();

  dialogResponse(response: boolean): void {
    this.response.emit(response);
  }
}
