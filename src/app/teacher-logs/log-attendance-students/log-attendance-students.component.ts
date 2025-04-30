import { Component, OnInit, Input } from '@angular/core';
import { TeacherLogService } from './../../service/teacher-log.service';
import { LoginService } from './../../service/login.service';
import { LogAttendance } from './../../interface/log-attendance';
import { Balance } from './../../interface/balance';
import { AlertService } from '../../service/alert.service';
import { faMoneyBill, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-log-attendance-students',
  templateUrl: './log-attendance-students.component.html',
  styleUrls: ['./log-attendance-students.component.css']
})

export class LogAttendanceStudentsComponent implements OnInit {

  @Input() teacherLogId: any;
  public logAttendances: LogAttendance[] = [];
  faMoneyBill = faMoneyBill;
  faMoneyBillTransfer = faMoneyBillTransfer;

  constructor(private teacherLogService: TeacherLogService, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadTransactions();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadTransactions(): void {
    this.teacherLogService.getLogAttendances(this.teacherLogId).subscribe (
      (response: any) => this.assignLogAttendances(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standards......')
    );
  }

  assignLogAttendances(response: any): void {
    this.logAttendances = response;
  }

  name(student: any): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

  togglePresentee(logAttendance: any): void {
    this.teacherLogService.toggleLogAttendance(this.teacherLogId, logAttendance.id).subscribe (
      (response: any) => this.toggleAttendance(logAttendance),
      (error: any) => this.errorHandle(error),
      () => console.log('Done toggle atttendance......')
    );
  }

  toggleAttendance(logAttendance: any): void {
    logAttendance.is_present = !logAttendance.is_present;
  }
}
