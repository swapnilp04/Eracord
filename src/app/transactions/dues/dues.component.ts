import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Student } from './../../interface/student';
import { Transaction } from './../../interface/transaction';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-dues',
  templateUrl: './dues.component.html',
  styleUrls: ['./dues.component.css']
})
export class DuesComponent implements OnInit {

  public student = {} as Student;
  public transaction = {} as Transaction;
  public studentId: number;
  public isLoading= false;

  constructor(private studentService: StudentService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.studentId = Number(param.get('student_id'));
      this.loadStudent(this.studentId);
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  submitDues(): void {
    this.isLoading = true;
    this.studentService.createStudentDues(this.studentId, this.transaction).subscribe (
      (response: any) => this.back(),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  loadStudent(studentID: number): void {
    this.isLoading = true;
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  assignStudent(response: any) {
    this.student = response;
    this.transaction.student_id = this.studentId;
  }


  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }

  back(): void {
    this.router.navigate(['/students', this.studentId]);
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }
}
