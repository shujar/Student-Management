import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';
import { StudentCourses, StudentCoursesExpanded } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {
  private apiUrl = 'http://localhost:6001/studentCourses';

  constructor(private http: HttpClient) {}

  // Get all students
  getAllStudentCourses(): Observable<StudentCoursesExpanded[]> {
    return this.http.get<StudentCoursesExpanded[]>(`${this.apiUrl}/?&_expand=course&_expand=student`).pipe(catchError(this.handleError));
  }

  /**
   * get all courses for a student
   * @param id 
   */
  getStudentCourseByStudentId(id: number) {
    return this.http.get<StudentCoursesExpanded>(`${this.apiUrl}/?studentId=${id}&_expand=course&_expand=student`).pipe(catchError(this.handleError));
  }

  // Add a course to a student
  addStudentCourse(studentId: number, courseId: number): Observable<StudentCourses> {
    return this.http.post<StudentCourses>(this.apiUrl, {studentId: studentId, courseId: courseId}).pipe(catchError(this.handleError));
  }

  // Delete a student course
  deleteStudentCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Delete multiple student courses
  deleteBatchStudentCourses(ids: number[]): Observable<void[]> {
    // Create an array of DELETE requests, one for each ID
    const deleteRequests = ids.map(id => this.deleteStudentCourse(id));

    // execute all DELETE requests in parallel
    return forkJoin(deleteRequests);
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    return throwError('Unable to complete the request. Please try again later.');
  }
}
