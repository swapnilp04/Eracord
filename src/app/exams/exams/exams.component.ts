import { Component, OnInit } from '@angular/core';
import { ExamService } from './../../service/exam.service';
import { LoginService } from './../../service/login.service';
import { Exam } from './../../interface/exam';


@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  public exams: Exam[] = [];
  constructor(private examService: ExamService, private loginService: LoginService){}



  ngOnInit(): void {
    this.loadExams();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
    if(error.status == 0) {
      this.loginService.toLogin();
    }
  }

  loadExams(): void {
    this.examService.getExams().subscribe (
      (response: any) => this.assignExam(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting exams......')
    );
  }


  assignExam(response: any) {
    this.exams = response
  }

}
