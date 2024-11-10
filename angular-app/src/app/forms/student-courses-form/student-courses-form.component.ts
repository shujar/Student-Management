import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentCourseService } from '../../services/student-course.service';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { Course, Student, StudentCourseData, StudentCoursesExpanded } from '../../models/types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateSnackbarComponent } from '../../components/create-snackbar/create-snackbar.component';

@Component({
  selector: 'app-student-courses-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-courses-form.component.html',
  styleUrl: './student-courses-form.component.scss'
})
export class StudentCoursesFormComponent {
  studentCourseForm: FormGroup;
  errorMessage?: string;
  studentCourses: StudentCourseData[] = [];
  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService,
    private studentCourseService: StudentCourseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.studentCourseForm = this.fb.group({
      student: new FormControl(null, [Validators.required]),
      course: new FormControl([], [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
    this.loadStudentCourses();
  }

  loadStudentCourses(): void {
    this.studentCourseService.getAllStudentCourses().subscribe({
      next: (data) => {
        this.studentCourses = this.mergeByStudentId(data);
      },
      error: (err) => {
        console.log("Unable to fetch students registered courses.", err);
      }
    });
  }

  mergeByStudentId(data: StudentCoursesExpanded[]) {
    let newStudentList: StudentCourseData[] = []

    data.forEach(d => {
      let elem = newStudentList.find(x => x.student.id == d.studentId);

      if(elem) {
        elem.courses.push(d.course);
      } else {
        newStudentList.push({
          student: d.student,
          courses: [d.course]
        })
      }
    });

    return newStudentList;
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students
      },
      error: (err) => {
        console.log("Unable to fetch students from database. ", err);
      }
    })
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses
      },
      error: (err) => {
        console.log("Unable to fetch courses from database. ", err);
      }
    })
  }

  filterStudentCourses(): Course[] {
    let studentId = this.studentCourseForm.get("student")?.value;

    if(studentId) {
      // find the selected students courses
      let courses = this.studentCourses.find(x => x.student.id === parseInt(studentId))

      if(courses) {
        // get a list of the registered courses for this student
        let studentCourseIds = courses.courses.map(x => x.id);
        // only return courses that are not already registered by the selected student
        return this.courses.filter(x => !studentCourseIds.includes(x.id));
      }
    }

    return this.courses;
  }

  onSubmit() {
    const studentCourse = this.studentCourseForm.value;
    let courseIds = studentCourse.course.map((x: string) => parseInt(x));

    this.studentCourseService.registerBatchStudentCourses(parseInt(studentCourse.student), courseIds).subscribe({
      next: () => {
        this.errorMessage = undefined;
        this.snackBar.openFromComponent(CreateSnackbarComponent,  {
          duration: 1000,
          verticalPosition: 'top',
        }).containerInstance.detach();
        
        this.router.navigate(["/student-courses"], { skipLocationChange: true })
      },
      error: (err) => {
        console.log("Error registering a student course.", err);
        this.errorMessage = err;
      }
    });
  }

  cancelForm() {
    console.log("StudentRegistration form canceled.")
    this.studentCourseForm.reset();
    this.router.navigate(['/student-courses'], { skipLocationChange: true });
  }
}
