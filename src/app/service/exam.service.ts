import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from './../interface/exam'


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getExams(): Observable<Exam[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Exam[]>(`${this.loginService.URL}/exams`, {headers: myHeaders});
  }

  getExam(examID: number): Observable<Exam> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Exam>(`${this.loginService.URL}/exams/${examID}`, {headers: myHeaders});
  }

  createExam(exam: Exam): Observable<Exam> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Exam>(`${this.loginService.URL}/exams`, exam, {headers: myHeaders});
  }

  updateExam(exam: Exam): Observable<Exam> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<Exam>(`${this.loginService.URL}/exams/${exam.id}`, exam, {headers: myHeaders});
  }

  conductExam(examID: number): Observable<Exam> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Exam>(`${this.loginService.URL}/exams/${examID}/conduct_exam`, {}, {headers: myHeaders});
  }
}
