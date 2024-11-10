import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './delete-snackbar.component.html',
  styleUrl: './delete-snackbar.component.scss'
})
export class DeleteSnackbarComponent {
  constructor(private snackbar: MatSnackBar) {
  }

  dismissSnackBar() {
    this.snackbar.dismiss();
  }
}
