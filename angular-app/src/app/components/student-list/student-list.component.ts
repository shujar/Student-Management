import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/types';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [ConfirmationModalComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  error: string | null = null;
  deleteRequestId: number = -1;
  showConfirmation: boolean = false;
  confirmationMessage: string = "";
  
  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  addNewStudent() {
    // navigate to Student Form in create mode
    this.router.navigate(["/students/add"], { skipLocationChange: true })
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.error = null;
      },
      error: (err) => {
        this.error = err;
      }
    });
  }

  editStudent(id: number) {
    if(id < 0) {
      return;
    }
    
    // route to edit form for selected student
    this.router.navigate([`/students/edit/${id}`], { skipLocationChange: false });
  }

  deleteStudent(id: number) {
    if(id < 0) {
      return;
    }

    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.error = null;
        this.getStudents();
      }, 
      error: (err) => {
        this.error = err;
      }
    });
  }

  deletePressed(id: number) {
    // store delete id
    this.deleteRequestId = id;

    // toggle delete confirmation modal
    this.showConfirmation = true;
  }

  getDeleteStudent() {
    let student = this.students.find(x => x.id === this.deleteRequestId);
    return `${student?.firstName} ${student?.lastName}`;
  }

  handleModalResponse(resp: boolean) {
    this.showConfirmation = false;
    if(resp) {
      this.deleteStudent(this.deleteRequestId);
    }
    this.deleteRequestId = -1;
  }
}
