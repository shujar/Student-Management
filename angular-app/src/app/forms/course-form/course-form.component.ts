import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrimLeadingWhitespaceDirective } from '../../directives/trim-leading-whitespace.directive';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  hostDirectives: [TrimLeadingWhitespaceDirective],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  courseForm: FormGroup;
  isEditMode = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required]],
      courseNumber: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.loadCourse(parseInt(id));
    }
  }

  loadCourse(id: number) {
    this.courseService.getCourse(id).subscribe({
      next: (data) => {
        this.courseForm.patchValue(data);
      },
      error: (err) => {
        this.errorMessage = err;
      }
    })
  }

  onSubmit() {
    const course = this.trimObjectStrings(this.courseForm.value);
    console.log("Course: ", course)

    if(course.courseName.length === 0) {
      console.log("CourseName is empty!");
      this.courseForm.get("courseName")?.setErrors({whitespaceError: 'true'});
    }
    if(course.courseNumber.length === 0) {
      this.courseForm.get("courseNumber")?.setErrors({whitespaceError: 'true'});
    }

    // update database with new/modified course
    if (this.isEditMode) {
      this.courseService.updateCourse(course).subscribe({
        next: () => this.router.navigate(['/courses'], { skipLocationChange: true }),
        error: (err) => this.errorMessage = err
      });
    } else {
      this.courseService.addCourse(course).subscribe({
        next: () => this.router.navigate(['/courses'], { skipLocationChange: true }),
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
    this.router.navigate(['/courses'], { skipLocationChange: true });
  }
}
