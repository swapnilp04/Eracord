import { Component, OnInit, Input } from '@angular/core';
import { TeacherLogService } from './../../service/teacher-log.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { TeacherLog } from './../../interface/teacher-log';
import { BatchStandard } from './../../interface/batch-standard';
import { Subject } from './../../interface/subject';
import { LogCategory } from './../../interface/log-category';
import { Teacher } from './../../interface/teacher';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from '../../service/alert.service';


@Component({
  selector: 'app-batch-standards-logs',
  templateUrl: './batch-standards-logs.component.html',
  styleUrls: ['./batch-standards-logs.component.css']
})
export class BatchStandardsLogsComponent implements OnInit{

  @Input() batchStandardId: any;

  public teacherLogs: TeacherLog[] = [];
  public subjects: Subject[] = [];
  public logCategories: LogCategory[] = [];
  public isLoading = false;  
  public searchBatchStandard = 0;
  public searchSubject= 0;
  public searchDate: any ;
  public searchStr = "";
  
  currentPage = 1;
  page= 1;
  totalItems: number = 10;

  constructor(private teacherLogService: TeacherLogService, private loginService: LoginService, private alertService: AlertService,
    private batchStandardService: BatchStandardService){}

  ngOnInit(): void {
    this.loadBatchStandardLogs(1);
    this.loadSubjects(this.batchStandardId);
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    while(this.teacherLogs.length > 0) {
      this.teacherLogs.pop();
    } 
    this.loadBatchStandardLogs(this.page);
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadBatchStandardLogs(this.page);  
  }

  loadBatchStandardLogs(pageNumber: number): void {
    this.teacherLogService.getBatchStandardTeacherLogs(this.batchStandardId, pageNumber, this.searchStr).subscribe (
      (response: any) => this.assignTeacherLogs(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Teacher Logs......')
    );
  }

  assignTeacherLogs(response: any) {
    this.teacherLogs = response.teacher_logs;
    this.totalItems = response.total;
  }

  onChangeSubject(newObj: number): void {
    this.searchSubject = newObj;
  }

  loadLogCategory(): void {
    this.teacherLogService.getLogCategories().subscribe (
      (response: any) => this.assignLogCategories(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  loadSubjects(newObj: number): void {
    this.batchStandardService.getBatchStandardSubjects(newObj).subscribe (
      (response: any) => this.assignSubjects(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Subjects......')
    );
  }

  onChangeCategory(newObj: number): void {

  }

  assignLogCategories(response: any) {
    this.logCategories = response;
  }

  assignSubjects(response: any) {
    this.subjects = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  } 


  filterLogs(): void {
    this.searchStr = "";
    if(this.searchBatchStandard == 0 && this.searchSubject ==0 && this.searchDate == undefined) {
      this.alertService.error("Please select Filter");
    }

    if(this.searchBatchStandard != 0) {
      this.searchStr = this.searchStr + "&searchBatchStandard="+this.searchBatchStandard;
    }

    if(this.searchSubject != 0) {
      this.searchStr = this.searchStr + "&searchSubject="+this.searchSubject;
    }

    if(this.searchDate != undefined) {
      var dateFormat = `${this.searchDate.getDate()}/${this.searchDate.getMonth() + 1}/${this.searchDate.getFullYear()}`;
      this.searchStr = this.searchStr + "&searchDate="+dateFormat;
    }
    this.loadBatchStandardLogs(this.page);
  }

  clear(): void {
    this.searchBatchStandard = 0;
    this.searchSubject = 0;
    this.subjects = [];
    this.searchStr = "";
    this.searchDate = undefined
    this.loadBatchStandardLogs(this.page);
  }
}
