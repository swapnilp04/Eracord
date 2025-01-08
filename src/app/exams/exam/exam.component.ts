import { Component, OnInit } from '@angular/core';
import { ExamService } from './../../service/exam.service';
import { LoginService } from './../../service/login.service';
import { Exam } from './../../interface/exam';
import { Student } from './../../interface/student';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faFilePen, faChevronLeft, faFloppyDisk, faPrint, faPlay, faBullhorn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  public exam = {} as Exam;
  public id: any;
  
  public isLoading = true;
  faFilePen = faFilePen;
  faChevronLeft = faChevronLeft;
  faPlay = faPlay;
  faBullhorn = faBullhorn;
  faPrint = faPrint;

  value?: string;
  
  constructor(private examService: ExamService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));      
      this.loadExam(this.id);
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadExam(examID: number): void {
    this.examService.getExam(examID).subscribe (
      (response: any) => this.assignExam(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Exam......')
    );
  }

  conductExam(examID: any): void {
    if(confirm("Are you sure to Conduct this exam")) {
      if(examID != undefined) {
        this.examService.conductExam(examID).subscribe (
          (response: any) => this.examConducted(response),
          (error: any) => this.errorHandle(error),
          () => console.log('Done getting Exam......')
        );
      }
    }
  }

  publishExam(examID: any): void {
    if(confirm("Are you sure to Conduct this exam")) {
      if(examID != undefined) {
        this.examService.publishExam(examID).subscribe (
          (response: any) => this.examPublished(response),
          (error: any) => this.errorHandle(error),
          () => console.log('Done getting Exam......')
        );
      }
    }
  }

  assignExam(response: any) {
    this.exam = response;
    this.isLoading = false;
  }

  examConducted(response: any) {
    this.exam.exam_status = "Conducted";
    this.alertService.success("Exam Conducted Successful");
  }

  examPublished(response: any) {
    this.exam.exam_status = "Published";
    this.alertService.success("Exam Published Successful");
  }

  back(): void {
    //this.location.back();
    this.router.navigate(['/exams']);
  }
}
