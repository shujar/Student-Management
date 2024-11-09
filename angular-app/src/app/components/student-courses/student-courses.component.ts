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
  studentCourses: StudentCourseData[] = [];
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
        this.studentCourses = this.mergeByStudentId(data);
        this.error = null;
      },
      error: (err) => {
        this.error = err;
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
  
}
