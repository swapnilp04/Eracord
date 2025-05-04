import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from './../interface/teacher'
import { Exam } from './../interface/exam'
import { TeacherLog } from './../interface/teacher-log'
import { Duration } from './../interface/duration'

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

  getTeacherReportsExams(teacherID: number, month: number, year: number): Observable<Exam[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Exam[]>(`${this.loginService.URL}/teachers/${teacherID}/get_monthly_exams_report?month=${month}&year=${year}`, {headers: myHeaders});
  } 

  getTeacherReportsTeacherLogs(teacherID: number, month: number, year: number): Observable<TeacherLog[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<TeacherLog[]>(`${this.loginService.URL}/teachers/${teacherID}/get_monthly_logs_report?month=${month}&year=${year}`, {headers: myHeaders});
  } 

  getTeacherReportsLogsDurations(teacherID: number, month: number, year: number): Observable<Duration[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Duration[]>(`${this.loginService.URL}/teachers/${teacherID}/get_monthly_logs_durations?month=${month}&year=${year}`, {headers: myHeaders});
  } 
}
