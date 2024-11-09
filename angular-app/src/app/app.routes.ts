import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { StudentFormComponent } from './forms/student-form/student-form.component';
import { CourseFormComponent } from './forms/course-form/course-form.component';
import { StudentCoursesFormComponent } from './forms/student-courses-form/student-courses-form.component';

export const routes: Routes = [
    { path: "students", component: StudentListComponent },
    { path: "students/add", component: StudentFormComponent },
    { path: "students/edit/:id", component: StudentFormComponent },
    { path: "courses", component: CourseListComponent },
    { path: "courses/add", component: CourseFormComponent },
    { path: "student-courses", component: StudentCoursesComponent },
    { path: "student-courses/add", component: StudentCoursesFormComponent },
];
