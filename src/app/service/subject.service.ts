import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from './../interface/subject'
import { Chapter } from './../interface/chapter'

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getSubjects(standardId: number): Observable<Subject[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Subject[]>(`${this.loginService.URL}/standards/${standardId}/subjects`, {headers: myHeaders});
  }

  getSubject(standardId: number, subjectID: number): Observable<Subject> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Subject>(`${this.loginService.URL}/standards/${standardId}/subjects/${subjectID}`, {headers: myHeaders});
  }

  createSubject(standardId: number, subject: Subject): Observable<Subject> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Subject>(`${this.loginService.URL}/standards/${standardId}/subjects`, subject, {headers: myHeaders});
  }

  updateSubject(standardId: number, subject: Subject): Observable<Subject> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<Subject>(`${this.loginService.URL}/standards/${standardId}/subjects/${subject.id}`, subject, {headers: myHeaders});
  }

  getChapters(subjectID: number): Observable<Chapter> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Chapter>(`${this.loginService.URL}/subjects/${subjectID}/chapters`, {headers: myHeaders});
  }  
}
