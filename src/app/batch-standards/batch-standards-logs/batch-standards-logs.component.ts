import { Component, OnInit, Input } from '@angular/core';
import { TeacherLogService } from './../../service/teacher-log.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { TeacherService } from './../../service/teacher.service';
import { LoginService } from './../../service/login.service';
import { TeacherLog } from './../../interface/teacher-log';
import { BatchStandard } from './../../interface/batch-standard';
import { Subject } from './../../interface/subject';
import { LogCategory } from './../../interface/log-category';
import { Teacher } from './../../interface/teacher';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from '../../service/alert.service';
import { faBroom, faFilter } from '@fortawesome/free-solid-svg-icons';


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
  public teachers: Teacher[] = [];
  public isLoading = false;  
  public searchTeacher = 0 ;
  public searchSubject= 0;
  public searchDate: any ;
  public searchStr = "";
  faFilter = faFilter;
  faBroom = faBroom;
  
  currentPage = 1;
  page= 1;
  totalItems: number = 10;

  constructor(private teacherLogService: TeacherLogService, private loginService: LoginService, private alertService: AlertService,
    private batchStandardService: BatchStandardService, private teacherService: TeacherService){}

  ngOnInit(): void {
    this.loadBatchStandardLogs(1);
    this.loadSubjects(this.batchStandardId);
    this.loadTeachers();
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
    this.teacherLogs = response.batchStandardLogs;
    this.totalItems = response.total;
  }

  onChangeSubject(newObj: number): void {
    this.searchSubject = newObj;
  }

  onChangeTeacher(newObj: number): void {
    this.searchTeacher = newObj;
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

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe (
      (response: any) => this.assignTeacher(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Teachers......')
    );
  }

  assignTeacher(response: any) {
    this.teachers = response
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
    if(this.searchTeacher == 0 && this.searchSubject ==0 && this.searchDate == undefined) {
      this.alertService.error("Please select Filter");
    }

    if(this.searchTeacher != 0) {
      this.searchStr = this.searchStr + "&searchTeacher="+this.searchTeacher;
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
    this.searchTeacher = 0;
    this.searchSubject = 0;
    this.searchStr = "";
    this.searchDate = undefined
    this.loadBatchStandardLogs(this.page);
  }
}
