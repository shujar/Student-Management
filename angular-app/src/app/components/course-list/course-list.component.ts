import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/types';
import { CourseService } from '../../services/course.service';

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
  
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getCourses();
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
}
