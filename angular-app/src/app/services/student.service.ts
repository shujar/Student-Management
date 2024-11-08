import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Student } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:6001/students';

  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Get a student by ID
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Add a new student
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(catchError(this.handleError));
  }

  // Update an existing student
  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student).pipe(catchError(this.handleError));
  }

  // Delete a student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    return throwError('Unable to complete the request. Please try again later.');
  }
}
