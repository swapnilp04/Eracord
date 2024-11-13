import { Component, OnInit } from '@angular/core';
import {StudentService} from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import {Student} from './../../interface/student';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';



@Component({
  selector: 'app-student',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent  implements OnInit {
  currentPage = 1;
  page= 1;
  totalItems: number = 10;
  search = "";

  public students: Student[] = [];
  constructor(private studentService: StudentService, private loginService: LoginService){}


  ngOnInit(): void {
    this.loadStudents(1);
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    while(this.students.length > 0) {
      this.students.pop();
    } 
    this.loadStudents(this.page);
  }

  searchTable(): void{
   this.loadStudents(this.page); 
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadStudents(this.page);  
  }

  loadStudents(pageNumber: number): void {
    this.studentService.getStudents(pageNumber, this.search).subscribe (
      (response: any) => this.assignStudents(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Students......')
    );
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => console.log(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  errorHandle(error: any): void {
    if(error.name == "HttpErrorResponse") {
      this.loginService.toLogin();
    }
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  createStudent(student: Student): void {
    this.studentService.createStudent(student).subscribe (
      (response: any) => console.log(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

    assignStudents(response: any) {
      this.students = response.students;
      this.totalItems = response.total;
    }
}
