import { Component, OnInit } from '@angular/core';
import { ExamService } from './../../service/exam.service';
import { LoginService } from './../../service/login.service';
import { Exam } from './../../interface/exam';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  public exam = {} as Exam;
  public id: any;
  dismissible = true;

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `Sutdent Created successfully. `
    }
  ];

  public alerts: Alert[] = [];
  public isLoading = true;

  value?: string;
  
  constructor(private examService: ExamService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
        this.alerts = this.defaultAlerts;
      }
    });
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));      
      this.loadExam(this.id);
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  loadExam(examID: number): void {
    this.examService.getExam(examID).subscribe (
      (response: any) => this.assignExam(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Exam......')
    );
  }

  conductExam(examID: any): void {
    if(examID != undefined) {
      this.examService.conductExam(examID).subscribe (
        (response: any) => this.examConducted(response),
        (error: any) => this.errorHandle(error),
        () => console.log('Done getting Exam......')
      );
    }
  }

  assignExam(response: any) {
    this.exam = response;
    this.isLoading = false;
  }

  examConducted(response: any) {
    this.exam.exam_status = "Conducted";
  }

  back(): void {
    //this.location.back();
    this.router.navigate(['/exams']);
  }
}
