import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TeacherLogService } from './../../service/teacher-log.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { TeacherLog } from './../../interface/teacher-log';
import { BatchStandard } from './../../interface/batch-standard';
import { Subject } from './../../interface/subject';
import { LogCategory } from './../../interface/log-category';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';


@Component({
  selector: 'app-teacher-logs-add-edit',
  templateUrl: './teacher-logs-add-edit.component.html',
  styleUrls: ['./teacher-logs-add-edit.component.css']
})
export class TeacherLogsAddEditComponent implements OnInit {
  public teacherLog = {} as TeacherLog;
  public isNew = true;
  public isLoading = false;
  public logCategories: LogCategory[] = [];
  public batchStandards: BatchStandard[] = [];
  public subjects: Subject[] = [];
  public currentTime = new Date()
  public startTime: Date;//= new Date(2024, 11, 17, 9, 30)
  public endTime: Date;//= new Date(2024, 11, 17, 10, 30)
  
  constructor(private teacherLogService: TeacherLogService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService, 
    private batchStandardService: BatchStandardService){}


  createTeacherLog(teacherLog: TeacherLog): void {
    this.isLoading = true;
    this.teacherLog.start_hour = this.startTime.getHours();
    this.teacherLog.start_minuit = this.startTime.getMinutes();
    this.teacherLog.end_hour = this.endTime.getHours();
    this.teacherLog.end_minuit = this.endTime.getMinutes();
    this.teacherLogService.createTeacherLog(teacherLog).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
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

  updateTeacherLog(teacherLog: TeacherLog): void {
    this.isLoading = true;
    this.teacherLogService.updateTeacherLog(teacherLog).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  ngOnInit(): void {
    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    } else {
      this.startTime = new Date(2024, 11, 17, 9, 30)
      this.endTime = new Date(2024, 11, 17, 10, 30)

    }

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      if(!this.isNew) {
        this.loadTeacherLog(id);
      }
    });
    this.loadLogCategory();
    this.loadDefaultBatchStandards();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  onChangeBatchStandard(newObj: number): void {
    this.teacherLog.batch_standard_id = newObj;
    this.loadSubjects(newObj);
  }

  onChangeSubject(newObj: number): void {
    this.teacherLog.subject_id = newObj;
  }

  onChangeCategory(newObj: number): void {
    this.teacherLog.log_category_id = newObj;
  }

  loadTeacherLog(teacherLogID: number): void {
    this.isLoading = true;
    this.teacherLogService.getTeacherLog(teacherLogID).subscribe (
      (response: any) => this.assignTeacherLog(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  back(): void {
    this.router.navigate(['/teacherLogs']);
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/logs`;
      this.alertService.success("Log Created Successful");
    } else {
      window.location.href = `/logs`;
      this.alertService.success("Log updated Successful");
    }
  }

  getError(error: any): void {
    
  }

  assignTeacherLog(response: any) {
    this.teacherLog = response;
    this.startTime = new Date(2024, 11, 17, this.teacherLog.start_hour, this.teacherLog.start_minuit)
    this.endTime = new Date(2024, 11, 17, this.teacherLog.end_hour, this.teacherLog.end_minuit)
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

}