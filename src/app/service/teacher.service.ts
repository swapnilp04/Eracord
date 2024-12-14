import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from './../interface/teacher'

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getTeachers(): Observable<Teacher[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Teacher[]>(`${this.loginService.URL}/teachers`, {headers: myHeaders});
  }

  getTeacher(teacherID: number): Observable<Teacher> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Teacher>(`${this.loginService.URL}/teachers/${teacherID}`, {headers: myHeaders});
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Teacher>(`${this.loginService.URL}/teachers`, teacher, {headers: myHeaders});
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<Teacher>(`${this.loginService.URL}/teachers/${teacher.id}`, teacher, {headers: myHeaders});
  }
}
