import { Component, OnInit } from '@angular/core';
import {StudentService} from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import {Student} from './../../interface/student';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from '../../service/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBed, faUserPen, faFolderOpen, faMoneyBill, faSquarePlus } from '@fortawesome/free-solid-svg-icons';


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
  faBed = faBed;
  faUserPen = faUserPen;
  faFolderOpen = faFolderOpen;
  faMoneyBill = faMoneyBill;
  faSquarePlus = faSquarePlus;

  public students: Student[] = [];
  constructor(private studentService: StudentService, private loginService: LoginService, private alertService: AlertService){}


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
    
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
    if(error.status == 0) {
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
