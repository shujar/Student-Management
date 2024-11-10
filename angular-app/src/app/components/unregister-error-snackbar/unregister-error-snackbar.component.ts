import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-unregister-error-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './unregister-error-snackbar.component.html',
  styleUrl: './unregister-error-snackbar.component.scss'
})
export class UnregisterErrorSnackbarComponent {
  constructor(private snackbar: MatSnackBar) {
  }

  dismissSnackBar() {
    this.snackbar.dismiss();
  }
}
