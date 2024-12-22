import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {TeacherService} from './../../service/teacher.service';
import { LoginService } from './../../service/login.service';
import {Teacher} from './../../interface/teacher';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-teacher-add-edit',
  templateUrl: './teacher-add-edit.component.html',
  styleUrls: ['./teacher-add-edit.component.css']
})
export class TeacherAddEditComponent {
  public teacher = {} as Teacher;
  public isNew = true;
  public isLoading = false;
  public formErr: any;
  
  constructor(private teacherService: TeacherService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService){}


  createTeacher(teacher: Teacher): void {
    this.isLoading = true;
    this.teacherService.createTeacher(teacher).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateTeacher(teacher: Teacher): void {
    this.isLoading = true;
    this.teacherService.updateTeacher(teacher).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  ngOnInit(): void {
    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    }

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      if(!this.isNew) {
        this.loadTeacher(id);
      }
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    } else {
      this.assignErrors(error);
    }
    this.isLoadingFalse()
  }

  loadTeacher(teacherID: number): void {
    this.isLoading = true;
    this.teacherService.getTeacher(teacherID).subscribe (
      (response: any) => this.assignTeacher(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  hasError(field: string): any {
    if(this.formErr == undefined) {
      return false
    }
    return (this.formErr[field] || []).length > 0
  }

  getErrorValue(field: string): any {
   if(this.formErr == undefined) {
      return []
    }
    return this.formErr[field] || []
  }

  assignErrors(error: any): void {
    this.formErr = error.error.error
    this.isLoadingFalse()
  }

  back(): void {
    this.router.navigate(['/teachers']);
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/teachers/${response['teacher']['id']}`;
      this.alertService.success("Teacher Created Successful");
    } else {
      window.location.href = `/teachers/${response['teacher']['id']}`;
      this.alertService.success("Teacher updated Successful");
    }
  }

  getError(error: any): void {
    
  }

  assignTeacher(response: any) {
    this.teacher = response;
    if(!this.isNew) {
      this.teacher.joining_date = new Date(this.teacher.joining_date)
    }
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }

}
