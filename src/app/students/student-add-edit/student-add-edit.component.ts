import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Student } from './../../interface/student';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {

  public student = {} as Student;
  public isNew = true;
  public formErr: any;
  
  constructor(private studentService: StudentService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService){}


  createStudent(student: Student): void {
    this.studentService.createStudent(student).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  updateStudent(student: Student): void {
    this.studentService.updateStudent(student).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  ngOnInit(): void {
    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    }

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      if(!this.isNew) {
        this.loadStudent(id);
      }
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else {
      this.assignErrors(error);
    }
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  back(): void {
    if(this.isNew) {
      this.router.navigate(['/students']);
    } else {
      this.router.navigate(['/students', this.student.id]);
    }
  }

  assignErrors(error: any): void {
    this.formErr = error.error.error
    console.log(this.formErr);
    console.log(typeof(this.formErr));
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/students/${response['student']['id']}?success=true`;
    } else {
      window.location.href = `/students/${response['student']['id']}?isUpdate=true`;
    }
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

  assignStudent(response: any) {
    this.student = response;
  }
}
