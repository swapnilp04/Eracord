import { Component, OnInit } from '@angular/core';
import { TeacherLogService } from './../../service/teacher-log.service';
import { LoginService } from './../../service/login.service';
import { TeacherLog } from './../../interface/teacher-log';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-teacher-logs',
  templateUrl: './teacher-logs.component.html',
  styleUrls: ['./teacher-logs.component.css']
})

export class TeacherLogsComponent implements OnInit {
  
  public teacherLogs: TeacherLog[] = [];
  currentPage = 1;
  page= 1;
  totalItems: number = 10;

  constructor(private teacherLogService: TeacherLogService, private loginService: LoginService){}

  ngOnInit(): void {
    this.loadTeacherLogs(1);
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    while(this.teacherLogs.length > 0) {
      this.teacherLogs.pop();
    } 
    this.loadTeacherLogs(this.page);
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadTeacherLogs(this.page);  
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
    if(error.status == 0) {
      this.loginService.toLogin();
    }
  }

  loadTeacherLogs(pageNumber: number): void {
    this.teacherLogService.getTeacherLogs(pageNumber).subscribe (
      (response: any) => this.assignTeacherLogs(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting TeacherLogs......')
    );
  }

  assignTeacherLogs(response: any) {
    this.teacherLogs = response.teacherLogs;
    this.totalItems = response.total;
  }
}
