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
    console.log(myHeaders);
    return this.http.get<Student[]>(`${this.URL}/students`, {headers: myHeaders});
  }

  getStudent(userID: number): Observable<Student> {
    return this.http.get<Student>(`${this.URL}/studnets/${userID}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.URL}/students`, student);
  }
}
