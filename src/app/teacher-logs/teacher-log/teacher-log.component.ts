import { Component, OnInit } from '@angular/core';
import { TeacherLogService } from './../../service/teacher-log.service';
import { LoginService } from './../../service/login.service';
import { TeacherLog } from './../../interface/teacher-log';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-teacher-log',
  templateUrl: './teacher-log.component.html',
  styleUrls: ['./teacher-log.component.css']
})
export class TeacherLogComponent {

  public teacherLog = {} as TeacherLog;
  public id: any;
  public isLoading = true;
  faChevronLeft = faChevronLeft;

  constructor(private teacherLogService: TeacherLogService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {    
    this.route.queryParams.subscribe((param) => {
      this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.loadTeacherLog(id);
      });
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadTeacherLog(teacherLogId: number): void {
    this.isLoading = true;
    this.teacherLogService.getTeacherLog(teacherLogId).subscribe (
      (response: any) => this.assignTeacherLog(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting TeacherLog......')
    );
  }

  assignTeacherLog(response: any) {
    this.teacherLog = response;
    this.disableLoading();
  }

  back(): void {
    this.location.back();
  }

  disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

}
