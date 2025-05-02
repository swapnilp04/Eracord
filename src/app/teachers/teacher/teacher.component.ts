import { Component, OnInit } from '@angular/core';
import { TeacherService } from './../../service/teacher.service';
import { LoginService } from './../../service/login.service';
import { Teacher } from './../../interface/teacher';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  public teacher = {} as Teacher;
  public id: any;
  public isLoading = true;
  faChevronLeft = faChevronLeft;
  
  constructor(private teacherService: TeacherService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {    
    this.route.queryParams.subscribe((param) => {
      this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      
      this.loadTeacher(id);
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

  loadTeacher(teacherID: number): void {
    this.teacherService.getTeacher(teacherID).subscribe (
      (response: any) => this.assignTeacher(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Teacher......')
    );
  }
 
  assignTeacher(response: any) {
    this.teacher = response;
    this.isLoading = false;
  }

  back(): void {
    this.location.back();
  }

  name(): string {
    return `${this.teacher.name}`
  }
}
