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
}
