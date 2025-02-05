import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { TeacherLogService } from './../../service/teacher-log.service';
import { TeacherLog } from './../../interface/teacher-log';
import { BatchStandard } from './../../interface/batch-standard';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-report-batch-standard-log',
  templateUrl: './report-batch-standard-log.component.html',
  styleUrls: ['./report-batch-standard-log.component.css']
})
export class ReportBatchStandardLogComponent implements OnInit {

  @Input() batchStandardId: any;
  @Input() date: Date;
  @Input() reportType: string;

  public teacherLogs: TeacherLog[] = [];
  public isLoading = false;  
  public searchStr = "";

  constructor(private teacherLogService: TeacherLogService, private loginService: LoginService,
    private alertService: AlertService){}


  ngOnInit(): void {
    this.loadTeacherLogs();
   
  }

  loadTeacherLogs(): void {
    this.isLoading = true;
    let dateStr = this.getDate();
    this.teacherLogService.getBatchStandardReportLogs(this.batchStandardId, this.reportType, dateStr).subscribe (
      (response: any) => this.assignTeacherLogs(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting TeacherLogs......')
    );
  }

  getDate(): string {
    this.searchStr = "";
  if(this.date != undefined) {
      var dateFormat = `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`;
      this.searchStr = this.searchStr + "&searchDate="+dateFormat;
    }
    return  this.searchStr;
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

  assignTeacherLogs(response: any) {
    this.teacherLogs = response;
    this.isLoadingFalse();
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  } 
}
