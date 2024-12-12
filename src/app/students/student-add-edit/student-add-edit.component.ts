import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Student } from './../../interface/student';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {

  public student = {} as Student;
  public isNew = true;
  public formErr: any;
  public isLoading = false;
  
  constructor(private studentService: StudentService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService){}


  createStudent(student: Student): void {
    this.isLoading = true;
    this.studentService.createStudent(student).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateStudent(student: Student): void {
    this.isLoading = true;    
    this.studentService.updateStudent(student).subscribe (
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
    this.isLoading = false;
  }

  loadStudent(studentID: number): void {
    this.isLoading = true;
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
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
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/students/${response['student']['id']}?success=true`;
      this.alertService.success("Student Created Successful");
    } else {
      window.location.href = `/students/${response['student']['id']}?isUpdate=true`;
      this.alertService.success("Student Updated Successful");
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
    if(!this.isNew) {
      this.student.birth_date = new Date(this.student.birth_date)
    }
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }
}
