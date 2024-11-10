import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { StudentFormComponent } from './forms/student-form/student-form.component';
import { CourseFormComponent } from './forms/course-form/course-form.component';
import { StudentRegistrationFormComponent } from './forms/student-registration-form/student-registration-form.component';

export const routes: Routes = [
    { path: "students", component: StudentListComponent },
    { path: "students/add", component: StudentFormComponent },
    { path: "students/edit/:id", component: StudentFormComponent },
    { path: "courses", component: CourseListComponent },
    { path: "courses/add", component: CourseFormComponent },
    { path: "courses/edit/:id", component: CourseFormComponent },
    { path: "student-registration", component: StudentRegistrationComponent },
    { path: "student-registration/add", component: StudentRegistrationFormComponent },
];
