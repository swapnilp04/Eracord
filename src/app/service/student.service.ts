import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interface/student'

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  URL = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.URL}/students`);
  }

  getStudent(userID: number): Observable<Student> {
    return this.http.get<Student>(`${this.URL}/studnets/${userID}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.URL}/students`, student);
  }
}
