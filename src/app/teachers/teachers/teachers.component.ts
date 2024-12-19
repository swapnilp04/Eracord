import { Component, OnInit } from '@angular/core';
import { TeacherService } from './../../service/teacher.service';
import { LoginService } from './../../service/login.service';
import { Teacher } from './../../interface/teacher';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  public teachers: Teacher[] = [];
  constructor(private teacherService: TeacherService, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadTeachers();
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
}
