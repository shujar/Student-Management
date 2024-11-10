import { Component, OnInit } from '@angular/core';
import { StudentCourseData, StudentCoursesExpanded } from '../../models/types';
import { StudentCourseService } from '../../services/student-course.service';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnregisterSnackbarComponent } from '../unregister-snackbar/unregister-snackbar.component';
import { UnregisterErrorSnackbarComponent } from '../unregister-error-snackbar/unregister-error-snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [ConfirmationModalComponent, MatIconModule, MatTooltipModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.scss'
})
export class StudentCoursesComponent implements OnInit {
  studentCourses: StudentCoursesExpanded[] = [];
  unregisterId: number = -1;
  showConfirmation: boolean = false;
  showStudentConfirmation: boolean = false;

  constructor(
    private studentCourseService: StudentCourseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStudentCourses();
  }

  registerStudentCourse() {
    this.router.navigate(['/student-courses/add'], { skipLocationChange: true });
  }

  getStudentCourses(): void {
    this.studentCourseService.getAllStudentCourses().subscribe({
      next: (data) => {
        this.studentCourses = data;
      },
      error: (err) => {
        this.snackBar.open("Error fetching student courses data.", "Close", {
          duration: 2000,
          verticalPosition: "top"
        });
        console.log("Error fetching student courses data: ", err);
      }
    });
  }

  getCoursesByStudent(data: StudentCoursesExpanded[]) {
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

  unregisterAllStudentCourses(studentId: number) {
    // get all ids to remove for the given studentId
    let ids = this.studentCourses.filter(x => x.student.id === studentId).map(x => x.id);

    this.studentCourseService.deleteBatchStudentCourses(ids).subscribe({
      next: () => {
        this.snackBar.openFromComponent(UnregisterSnackbarComponent, {
          duration: 1000,
          verticalPosition: 'top'
        });
        this.getStudentCourses();
      },
      error: (err) => {
        this.snackBar.openFromComponent(UnregisterErrorSnackbarComponent, {
          duration: 2000,
          verticalPosition: 'top'
        });
        console.log("Error unregistering all classes for student id: ", studentId, err);
      }
    });
  }
  
  unregisterStudentCourse(studentCourseId: number) {
    if(studentCourseId === -1) {
      return;
    }

    this.studentCourseService.deleteStudentCourse(studentCourseId).subscribe({
      next: () => {
        this.snackBar.openFromComponent(UnregisterSnackbarComponent, {
          duration: 1000,
          verticalPosition: 'top'
        });
        this.getStudentCourses();
      },
      error: (err) => {
        this.snackBar.openFromComponent(UnregisterErrorSnackbarComponent, {
          duration: 2000,
          verticalPosition: 'top'
        });
        console.log("Error unregistering student course: ", studentCourseId, err);
      }
    })
  } 

  handleConfirmResponse(resp: boolean) {
    this.showConfirmation = false;
    
    if(resp) {
      this.unregisterStudentCourse(this.unregisterId);
    }

    this.unregisterId = -1;
  }

  handleCourseUnregisterPress(studentId: number, courseId: number) {
    if(studentId === -1 || courseId === -1) {
      return;
    }

    // find StudentCourse table id for studentId and courseId
    let studentCourseId = this.studentCourses.find(x => x.student.id === studentId && x.course.id === courseId)?.id;
    this.unregisterId = studentCourseId ?? -1;

    this.showConfirmation = true;
  }

  handleUnregisterStudentPress(studentId: number) {
    this.unregisterId = studentId;
    this.showStudentConfirmation = true;
  }

  handleStudentConfirmResponse(resp: boolean) {
    this.showStudentConfirmation = false;
    if(resp) {
      this.unregisterAllStudentCourses(this.unregisterId);
    }
    this.unregisterId = -1;
  }

  getUnregisterStudentCourse() {
    let sc = this.studentCourses.find(x => x.id === this.unregisterId);
    return `${sc?.student.firstName} ${sc?.student.lastName}`;
  }

  getUnregisterStudent() {
    let sc = this.studentCourses.find(x => x.student.id === this.unregisterId);
    return `${sc?.student.firstName} ${sc?.student.lastName}`;;
  }

  getAllUnregisterStudentCourses() {
    let courses = this.studentCourses.filter(x => x.student.id === this.unregisterId).map(x => x.course);
    return courses;
  }

  getUnregisterCourse() {
    let sc = this.studentCourses.find(x => x.id === this.unregisterId);
    return `[${sc?.course.courseNumber}] ${sc?.course.courseName}`;
  }
}
