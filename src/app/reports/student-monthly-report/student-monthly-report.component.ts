import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { LogAttendance } from './../../interface/log-attendance';
import { Student } from './../../interface/student';
import { ExamStudent } from './../../interface/exam-student';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';


@Component({
  selector: 'app-student-monthly-report',
  templateUrl: './student-monthly-report.component.html',
  styleUrls: ['./student-monthly-report.component.css']
})
export class StudentMonthlyReportComponent {

  public student = {} as Student;
  public examStudents:  ExamStudent[] = [];
  public logAttendances:  LogAttendance[] = [];
  public id: any;  
  isLoading = true;
  public month: number;
  public year: number;
  faChevronLeft = faChevronLeft;
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor( private loginService: LoginService, private alertService: AlertService, private location: Location,
    private router: Router, private route: ActivatedRoute, private studentService: StudentService){}


  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));      
      this.loadStudent(this.id);
    });

    this.route.queryParams
      //.filter(params => params.order)
      .subscribe(params => {
        this.month = params['month'];
        this.year = params['year'];
        this.loadStudentExams(this.id,this.month, this.year);
        this.loadStudentLogs(this.id,this.month, this.year);
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

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  assignStudent(response: any) {
    this.student = response;
    this.isLoading = false;
  }

  loadStudentExams(studentID: number, month: number, year: number): void {
    this.studentService.getStudentMonthlyExamsReport(studentID, month, year).subscribe (
      (response: any) => this.assignStudentExams(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Students Exams......')
    );
  }

  assignStudentExams(response: any) {
    this.examStudents = response;
  }

  loadStudentLogs(studentID: number, month: number, year: number): void {
    this.studentService.getStudentReportsTeacherLogs(studentID, month, year).subscribe (
      (response: any) => this.assignLogAttendances(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student Logs......')
    );
  }

  assignLogAttendances(response: any) {
    this.logAttendances = response;
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }

  back(): void {
    this.location.back();
  }
}
