import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  error: string | null = null;
  
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
}
