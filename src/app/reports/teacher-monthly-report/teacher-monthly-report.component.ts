import { Component, OnInit } from '@angular/core';
import { TeacherService } from './../../service/teacher.service';
import { LoginService } from './../../service/login.service';
import { TeacherLog } from './../../interface/teacher-log';
import { Teacher } from './../../interface/teacher';
import { Exam } from './../../interface/exam';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-monthly-report',
  templateUrl: './teacher-monthly-report.component.html',
  styleUrls: ['./teacher-monthly-report.component.css']
})
export class TeacherMonthlyReportComponent implements OnInit {
  
  public teacher = {} as Teacher;
  public exams:  Exam[] = [];
  public teacherLogs:  TeacherLog[] = [];
  public id: any;  
  isLoading = true;
  public month: number;
  public year: number;
  faChevronLeft = faChevronLeft;
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor( private loginService: LoginService, private alertService: AlertService, private location: Location,
    private router: Router, private route: ActivatedRoute, private teacherService: TeacherService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));      
      this.loadTeacher(this.id);
    });

    this.route.queryParams
      //.filter(params => params.order)
      .subscribe(params => {
        this.month = params['month'];
        this.year = params['year'];
        this.loadTeacherExams(this.id,this.month, this.year);
        this.loadTeacherLogs(this.id,this.month, this.year);
      }
    );
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadTeacher(teacherID: number): void {
    this.teacherService.getTeacher(teacherID).subscribe (
      (response: any) => this.assignTeacher(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Teacher......')
    );
  }

  loadTeacherExams(teacherID: number, month: number, year: number): void {
    this.teacherService.getTeacherReportsExams(teacherID, month, year).subscribe (
      (response: any) => this.assignTeacherExams(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Teacher Exams......')
    );
  }

  assignTeacherExams(response: any) {
    this.exams = response;
  }

  loadTeacherLogs(teacherID: number, month: number, year: number): void {
    this.teacherService.getTeacherReportsTeacherLogs(teacherID, month, year).subscribe (
      (response: any) => this.assignTeacherLogs(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Teacher Exams......')
    );
  }

  assignTeacherLogs(response: any) {
    this.teacherLogs = response;
  }
 
  assignTeacher(response: any) {
    this.teacher = response;
    this.isLoading = false;
  }

  name(): string {
    return `${this.teacher.name}`
  }

  back(): void {
    this.location.back();
  }
}
