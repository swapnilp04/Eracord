import { Component, OnInit } from '@angular/core';
import { TeacherLogService } from './../../service/teacher-log.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { TeacherService } from './../../service/teacher.service';
import { LoginService } from './../../service/login.service';
import { TeacherLog } from './../../interface/teacher-log';
import { BatchStandard } from './../../interface/batch-standard';
import { Subject } from './../../interface/subject';
import { LogCategory } from './../../interface/log-category';
import { Teacher } from './../../interface/teacher';
import { AlertService } from '../../service/alert.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-teacher-logs',
  templateUrl: './teacher-logs.component.html',
  styleUrls: ['./teacher-logs.component.css']
})

export class TeacherLogsComponent implements OnInit {
  
  public teacherLogs: TeacherLog[] = [];
  public logCategories: LogCategory[] = [];
  public batchStandards: BatchStandard[] = [];
  public subjects: Subject[] = [];
  public teachers: Teacher[] = [];
  public isLoading = false;  
  public searchBatchStandard = 0;
  public searchSubject= 0;
  public searchTeacher = 0 ;
  public searchStr = "";
  currentPage = 1;
  page= 1;
  totalItems: number = 10;

  constructor(private teacherLogService: TeacherLogService, private loginService: LoginService,
    private batchStandardService: BatchStandardService, private teacherService: TeacherService,
    private alertService: AlertService){}

  ngOnInit(): void {
    this.loadTeacherLogs(1, this.searchStr);
    this.loadDefaultBatchStandards();
    this.loadTeachers();
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    while(this.teacherLogs.length > 0) {
      this.teacherLogs.pop();
    } 
    this.loadTeacherLogs(this.page, this.searchStr);
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadTeacherLogs(this.page, this.searchStr);  
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

  loadTeacherLogs(pageNumber: number, searchStr: string): void {
    this.teacherLogService.getTeacherLogs(pageNumber, searchStr).subscribe (
      (response: any) => this.assignTeacherLogs(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting TeacherLogs......')
    );
  }

  assignTeacherLogs(response: any) {
    this.teacherLogs = response.teacherLogs;
    this.totalItems = response.total;
  }

  loadLogCategory(): void {
    this.teacherLogService.getLogCategories().subscribe (
      (response: any) => this.assignLogCategories(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  loadDefaultBatchStandards(): void {
    this.batchStandardService.getDefaultBatchStandards().subscribe (
      (response: any) => this.assignBatchStandards(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting exams......')
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

  onChangeBatchStandard(newObj: any): void {
    this.searchBatchStandard = newObj;
    this.loadSubjects(newObj);
    this.searchSubject = 0;
    
  }

  onChangeSubject(newObj: number): void {
    this.searchSubject = newObj;

  }
  onChangeTeacher(newObj: number): void {
    this.searchTeacher = newObj;
  }

  onChangeCategory(newObj: number): void {

  }

  assignLogCategories(response: any) {
    this.logCategories = response;
  }

  assignBatchStandards(response: any) {
    this.batchStandards = response;
  }

  assignSubjects(response: any) {
    this.subjects = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  } 

  filterLogs(): void {
    this.searchStr = "";
    if(this.searchBatchStandard == 0 && this.searchSubject ==0 && this.searchTeacher == 0) {
      this.alertService.error("Please select Filter");
    }

    if(this.searchBatchStandard != 0) {
      this.searchStr = this.searchStr + "&searchBatchStandard="+this.searchBatchStandard;
    }

    if(this.searchSubject != 0) {
      this.searchStr = this.searchStr + "&searchSubject="+this.searchSubject;
    }

    if(this.searchTeacher != 0) {
      this.searchStr = this.searchStr + "&searchTeacher="+this.searchTeacher;
    }
    this.loadTeacherLogs(this.page, this.searchStr);
  }

  clear(): void {
    this.searchBatchStandard = 0;
    this.searchSubject = 0;
    this.searchTeacher = 0;
    this.subjects = [];
    this.searchStr = "";
    this.loadTeacherLogs(this.page, this.searchStr);
  }
}
