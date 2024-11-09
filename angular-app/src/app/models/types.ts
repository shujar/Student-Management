export interface Student {
    id?: number;
    firstName: string;
    lastName: number;
}

export interface Course {
    id?: number;
    courseName: string;
    courseNumber: string;
}

export interface StudentCourses {
    id?: number
    studentId: number
    courseId: number
}

export interface StudentCoursesExpanded {
    id?: number
    studentId: number,
    courseId: number,
    course: Course,
    student: Student
}
  
