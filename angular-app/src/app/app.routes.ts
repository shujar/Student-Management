import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';

export const routes: Routes = [
    { path: "students", component: StudentListComponent },
    { path: "courses", component: CourseListComponent },
    { path: "student_courses", component: StudentCoursesComponent },
];
