import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'test',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  constructor(private router: Router) {

  }
  
  showStudents() {
    this.router.navigate(['/students'], { skipLocationChange: true });
  }

  showCourses() {
    this.router.navigate(['/courses'], { skipLocationChange: true });
  }

  showStudentCourses() {
    this.router.navigate(['/student_courses'], { skipLocationChange: true });
  }
}
