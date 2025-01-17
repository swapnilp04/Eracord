import { Component, OnInit } from '@angular/core';
import { ExamService } from './../../service/exam.service';
import { LoginService } from './../../service/login.service';
import { Exam } from './../../interface/exam';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from '../../service/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilePen, faFolderOpen, faSquarePlus, faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  public exams: Exam[] = [];
  currentPage = 1;
  public page = 1;
  totalItems: number = 10;
  faFilePen = faFilePen;
  faFolderOpen = faFolderOpen;
  faSquarePlus = faSquarePlus;
  faFileLines = faFileLines;
  constructor(private examService: ExamService, private loginService: LoginService, private alertService: AlertService){}



  ngOnInit(): void {
    this.loadExams(this.page);
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    while(this.exams.length > 0) {
      this.exams.pop();
    } 
    this.loadExams(this.page);
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadExams(this.page);  
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
    if(error.status == 0) {
      this.loginService.toLogin();
    }
  }

  loadExams(pageNumber: number): void {
    this.examService.getExams(pageNumber).subscribe (
      (response: any) => this.assignExam(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting exams......')
    );
  }


  assignExam(response: any) {
    this.exams = response.exams
    this.totalItems = response.total;
  }

}
