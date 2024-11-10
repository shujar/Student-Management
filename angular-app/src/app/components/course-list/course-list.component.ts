import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/types';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [ConfirmationModalComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  error: string | null = null;
  deleteRequestId: number = -1;
  showConfirmation: boolean = false;
  
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

  getDeleteCourse() {
    let course = this.courses.find(x => x.id === this.deleteRequestId);
    return `[${course?.courseNumber}] ${course?.courseName}`;
  }

  handleDeletePressed(id: number) {
    // store delete id
    this.deleteRequestId = id;

    // toggle delete confirmation modal
    this.showConfirmation = true;
  }

  handleConfirmResponse(resp: boolean) {
    this.showConfirmation = false;
    
    if(resp) {
      this.deleteCourse(this.deleteRequestId);
    }

    this.deleteRequestId = -1;

  }
}
