import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from './../interface/exam'
import { ExamStudent } from './../interface/exam-student'
import { ExamStudentMarks } from './../interface/exam-student-marks'


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getExams(page: number): Observable<Exam[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Exam[]>(`${this.loginService.URL}/exams?page=${page}`, {headers: myHeaders});
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

  publishExam(examID: number): Observable<Exam> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Exam>(`${this.loginService.URL}/exams/${examID}/publish_exam`, {}, {headers: myHeaders});
  }

  getExamStudents(examID: number): Observable<ExamStudent[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<ExamStudent[]>(`${this.loginService.URL}/exams/${examID}/exam_students`, {headers: myHeaders});
  }

  saveExamMarks(examID: number, examStudents: ExamStudent[]): Observable<Exam> {
    const myHeaders = this.loginService.getHeaders();
    var examStudentsObj = this.examStudentsToObj(examStudents)
    return this.http.post<Exam>(`${this.loginService.URL}/exams/${examID}/save_exam_marks`, examStudentsObj,  {headers: myHeaders});
  }

  examStudentsToObj(examStudents: ExamStudent[]): ExamStudentMarks[] {
    var studentObject = [];
    
    for (let i = 0; i < examStudents.length; i++) {
      studentObject.push({id: examStudents[i].id, marks: examStudents[i].marks, is_present: examStudents[i].is_present})
    }
    return studentObject
  }
}
