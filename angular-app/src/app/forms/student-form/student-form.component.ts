import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrimLeadingWhitespaceDirective } from '../../directives/trim-leading-whitespace.directive';

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
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
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
      this.loadStudent(parseInt(id));
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

  onSubmit() {
    const student = this.trimObjectStrings(this.studentForm.value);

    if(student.firstName.length === 0) {
      this.studentForm.get("firstName")?.setErrors({whitespaceError: 'true'});
    }
    if(student.lastName.length === 0) {
      this.studentForm.get("lastName")?.setErrors({whitespaceError: 'true'});
    }

    // update database with new/modified student
    if (this.isEditMode) {
      this.studentService.updateStudent(student).subscribe({
        next: () => this.router.navigate(['/students']),
        error: (err) => this.errorMessage = err
      });
    } else {
      this.studentService.addStudent(student).subscribe({
        next: () => this.router.navigate(['/students']),
        error: (err) => this.errorMessage = err
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
