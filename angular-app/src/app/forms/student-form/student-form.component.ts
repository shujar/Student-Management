import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrimLeadingWhitespaceDirective } from '../../directives/trim-leading-whitespace.directive';
import { Student } from '../../models/types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateSnackbarComponent } from '../../components/create-snackbar/create-snackbar.component';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  hostDirectives: [TrimLeadingWhitespaceDirective],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  studentId: number = -1;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.studentId = parseInt(id);
      this.loadStudent(this.studentId);
    }
  }

  loadStudent(id: number) {
    this.studentService.getStudent(id).subscribe({
      next: (data) => {
        this.studentForm.patchValue(data);
      },
      error: (err) => {
        this.errorMessage = err;
      }
    })
  }

  resetForm() {
    this.studentForm.reset();
    if(this.isEditMode) {
      this.loadStudent(this.studentId);
    }
  }

  onSubmit() {
    const student = this.trimObjectStrings(this.studentForm.value);

    if(student.firstName.length === 0) {
      this.studentForm.get("firstName")?.setErrors({whitespaceError: 'true'});
    }
    if(student.lastName.length === 0) {
      this.studentForm.get("lastName")?.setErrors({whitespaceError: 'true'});
    }

    if(!this.studentForm.valid) {
      return;
    }

    // update database with new/modified student
    if (this.isEditMode) {
      let editStudent: Student = {
          id: this.studentId,
          firstName: student.firstName,
          lastName: student.lastName
      }

      this.studentService.updateStudent(editStudent).subscribe({
        next: () => { 
          this.snackBar.openFromComponent(CreateSnackbarComponent,  {
            duration: 500,
            verticalPosition: 'top',
          });

          this.router.navigate(['/students'])
        },
        error: (err) => this.errorMessage = err
      });
    } else {
      this.studentService.addStudent(student).subscribe({
        next: () => {
          this.snackBar.openFromComponent(CreateSnackbarComponent,  {
            duration: 500,
            verticalPosition: 'top',
          });
          
          this.router.navigate(['/students'])
        },
        error: (err) => { 
          this.errorMessage = err
        }
      });
    }
  }

  trimObjectStrings(obj: any): any {
    if (typeof obj === 'string') {
      return obj.trim();
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = this.trimObjectStrings(obj[key]);
        }
      }
    }
    return obj;
  }

  cancelForm() {
    this.router.navigate(['/students'], { skipLocationChange: true });
  }
}
