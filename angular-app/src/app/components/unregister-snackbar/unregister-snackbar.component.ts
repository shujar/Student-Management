import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-unregister-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './unregister-snackbar.component.html',
  styleUrl: './unregister-snackbar.component.scss'
})
export class UnregisterSnackbarComponent {
  constructor(private snackbar: MatSnackBar) {
  }

  dismissSnackBar() {
    this.snackbar.dismiss();
  }
}
