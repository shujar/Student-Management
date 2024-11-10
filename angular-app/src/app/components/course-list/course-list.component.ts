import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/types';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteSnackbarComponent } from '../delete-snackbar/delete-snackbar.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [ConfirmationModalComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  deleteRequestId: number = -1;
  showConfirmation: boolean = false;
  
  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar,
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
      },
      error: (err) => {
        this.snackBar.open("Error fetching courses data.", "Close", {
          duration: 2000,
          verticalPosition: "top"
        });
        console.log("Error fetching courses data: ", err);
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
        this.snackBar.openFromComponent(DeleteSnackbarComponent, {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.getCourses();
      }, 
      error: (err) => {
        this.snackBar.open("Error deleting course.", "Close", {
          duration: 2000,
          verticalPosition: "top"
        });
        console.log("Error deleting course: ", err);
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
