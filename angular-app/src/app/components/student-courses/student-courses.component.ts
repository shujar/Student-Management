import { Component, OnInit } from '@angular/core';
import { StudentCourseData, StudentCoursesExpanded } from '../../models/types';
import { StudentCourseService } from '../../services/student-course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.scss'
})
export class StudentCoursesComponent implements OnInit {
  studentCourses: StudentCoursesExpanded[] = [];
  error: string | null = null;
  
  constructor(
    private studentCourseService: StudentCourseService,
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
        this.error = null;
      },
      error: (err) => {
        this.error = err;
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
        this.getStudentCourses();
      },
      error: (err) => {
        // TODO show error
        console.log("Error unregistering all classes for student id: ", studentId, err);
      }
    });
  }
  
  unregisterStudentCourse(studentId: number, courseId: number) {
    if(studentId < 0 || courseId < 0) {
      return;
    }

    // get the Student Course table id from studentId and courseId
    let studentCourseId = this.studentCourses.find(x => x.student.id === studentId && x.course.id === courseId)?.id;

    if(!studentCourseId) {
      //TODO show error, record not found
      return;
    }

    this.studentCourseService.deleteStudentCourse(studentCourseId).subscribe({
      next: () => {
        this.getStudentCourses();
      },
      error: (err) => {
        //TODO handle errors
        console.log("Error unregistering student course: ", studentId, courseId, err);
      }
    })
  } 
}
