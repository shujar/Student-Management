import { Component, OnInit } from '@angular/core';
import { Course, Student, StudentCoursesExpanded } from '../../models/types';
import { StudentCourseService } from '../../services/student-course.service';

interface StudentCourseData {
  student: Student
  courses: Course[]
}

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
  
  constructor(private studentCourseService: StudentCourseService) { }

  ngOnInit(): void {
    this.getStudentCourses();
  }

  getStudentCourses(): void {
    this.studentCourseService.getAllStudentCourses().subscribe({
      next: (data) => {
        // this.studentCourses = data;
        this.studentCourses = this.mergeByStudentId(data);
        console.log("What is data: ", this.studentCourses);
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
