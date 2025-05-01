import { Component, OnInit, Input } from '@angular/core';
import { Student } from './../../interface/student';
import { LogAttendance } from './../../interface/log-attendance';
import { ExamStudent } from './../../interface/exam-student';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-student-log-attendance',
  templateUrl: './student-log-attendance.component.html',
  styleUrls: ['./student-log-attendance.component.css']
})
export class StudentLogAttendanceComponent implements OnInit {

  @Input() studentId: any;
  @Input() studentName: any;
  currentPage = 1;
  page = 1;
  totalItems: number = 10;
  public isLoading = true;
  public logAttendances: LogAttendance[] = [];

  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location, 
    private router: Router, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadLogAttendance(this.studentId, 1)
  }

  loadLogAttendance(studentId: number, page: number): void {
    this.studentService.getStudentLogAttendances(studentId, page).subscribe (
      (response: any) => this.assignLogAttendance(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoading =false
    );
  }

  pageChanged(event: PageChangedEvent): void {
    while(this.logAttendances.length > 0) {
      this.logAttendances.pop();
    }
    this.page = event.page;
    this.loadLogAttendance(this.studentId, this.page);
  }

  assignLogAttendance(response: any) {
    this.logAttendances = response.log_attendances;
    this.totalItems = response.total;
    this.isLoading =false;
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }  
}
