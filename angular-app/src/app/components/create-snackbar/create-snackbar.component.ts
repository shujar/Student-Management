import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './create-snackbar.component.html',
  styleUrl: './create-snackbar.component.scss'
})
export class CreateSnackbarComponent {
  constructor(private snackbar: MatSnackBar) {
  }

  dismissSnackBar() {
    this.snackbar.dismiss();
  }
}
