import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/types';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  error: string | null = null;
  
  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  addNewCourse() {
    // navigate to Student Form in create mode
    this.router.navigate(['/courses/add'], { skipLocationChange: true });
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.error = null;
      },
      error: (err) => {
        this.error = err;
      }
    });
  }

  editCourse(id: number) {
    if(id < 0) {
      return;
    }
    
    // route to edit form for selected course
    this.router.navigate([`/courses/edit/${id}`], { skipLocationChange: false });
  }

  deleteCourse(id: number) {
    if(id < 0) {
      return;
    }

    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.error = null;
        this.getCourses();
      }, 
      error: (err) => {
        this.error = err;
      }
    });
  }
}
