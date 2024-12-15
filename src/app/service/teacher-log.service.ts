import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherLog } from './../interface/teacher-log'
import { LogCategory } from './../interface/log-category'

@Injectable({
  providedIn: 'root'
})
export class TeacherLogService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getTeacherLogs(page: number): Observable<TeacherLog[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<TeacherLog[]>(`${this.loginService.URL}/logs?page=${page}`, {headers: myHeaders});
  }

  getTeacherLog(teacherLogID: number): Observable<TeacherLog> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<TeacherLog>(`${this.loginService.URL}/logs/${teacherLogID}`, {headers: myHeaders});
  }

  createTeacherLog(teacherLog: TeacherLog): Observable<TeacherLog> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<TeacherLog>(`${this.loginService.URL}/logs`, teacherLog, {headers: myHeaders});
  }

  updateTeacherLog(teacherLog: TeacherLog): Observable<TeacherLog> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<TeacherLog>(`${this.loginService.URL}/logs/${teacherLog.id}`, teacherLog, {headers: myHeaders});
  }  

  getLogCategories(): Observable<LogCategory[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<LogCategory[]>(`${this.loginService.URL}/log_categories`, {headers: myHeaders});
  }
}
