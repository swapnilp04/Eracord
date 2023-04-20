import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interface/student'


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  URL = "http://localhost:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getStudents(): Observable<Student[]> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<Student[]>(`${this.URL}/students`, {headers: myHeaders});
  }

  getStudent(userID: number): Observable<Student> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<Student>(`${this.URL}/students/${userID}`, {headers: myHeaders});
  }

  createStudent(student: Student): Observable<Student> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.post<Student>(`${this.URL}/students`, student, {headers: myHeaders});
  }

  getStudentHostel(userID: number): Observable<Student> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<Student>(`${this.URL}/students/${userID}/hostel`, {headers: myHeaders});
  }  
}
