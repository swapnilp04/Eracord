import { Component, OnInit } from '@angular/core';
import { TeacherService } from './../../service/teacher.service';
import { LoginService } from './../../service/login.service';
import { Teacher } from './../../interface/teacher';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  public teacher = {} as Teacher;
  public id: any;
  public isLoading = true;
  
  constructor(private teacherService: TeacherService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService){}

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
    this.router.navigate(['/teachers']);
  }

  name(): string {
    return `${this.teacher.name}`
  }
}
