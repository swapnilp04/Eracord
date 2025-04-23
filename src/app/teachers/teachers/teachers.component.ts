import { Component, OnInit } from '@angular/core';
import { TeacherService } from './../../service/teacher.service';
import { LoginService } from './../../service/login.service';
import { Teacher } from './../../interface/teacher';
import { AlertService } from '../../service/alert.service';
import { faFilePen, faChevronLeft, faFolderOpen, faUserTie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  public teachers: Teacher[] = [];
  faChevronLeft = faChevronLeft;
  faFilePen = faFilePen;
  faFolderOpen = faFolderOpen;
  faUserTie = faUserTie;
  isLoading = true;

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
    this.isLoading = false;
  }

  loadTeachers(): void {
    this.isLoading = true;
    this.teacherService.getTeachers().subscribe (
      (response: any) => this.assignTeacher(response),
      (error: any) => this.errorHandle(error),
      () => this.disableLoading()
    );
  }

  disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  assignTeacher(response: any) {
    this.teachers = response
  }
}
