import { Component, OnInit } from '@angular/core';
import { TeacherService } from './../../service/teacher.service';
import {StudentService} from './../../service/student.service';
import { Teacher } from './../../interface/teacher';
import {Student} from './../../interface/student';
import { LoginService } from './../../service/login.service';
import { AlertService } from '../../service/alert.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent {

  public teachers: Teacher[] = [];
  public students: Student[] = [];

  public months = [
    {name: "January", id: 1}, 
    {name:"February", id: 2},
    {name:"March", id: 3},
    {name: "April", id: 4},
    {name: "May", id: 5},
    {name: "June", id: 6},
    {name: "July", id: 7},
    {name: "August", id: 8},
    {name: "September", id: 9},
    {name: "October", id: 10},
    {name: "November", id: 11},
    {name: "December", id: 12}
  ];

  public years = [2024, 2025];
  public selectedMonth = 0;
  public selectedYear = 0;
  public formErr:any =  {};
  public searchTeacher = 0 ;
  public searchStudent = 0 ;

  constructor(private studentService: StudentService, private teacherService: TeacherService, private loginService: LoginService, 
    private alertService: AlertService, private router: Router){}

  ngOnInit(): void {
    this.loadTeachers();
    this.loadStudents();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe (
      (response: any) => this.assignTeacher(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Teachers')
    );
  }

  loadStudents(): void {
    this.studentService.getOnlyStudents().subscribe (
      (response: any) => this.assignStudents(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Students')
    );
  }


  assignTeacher(response: any) {
    this.teachers = response
  }

  assignStudents(response: any) {
    this.students = response;
  }

  onChangeMonth(newObj: number): void {
    this.selectedMonth = newObj;
    this.removeError("Month")
  }

  onChangeYear(newObj: number): void {
    this.selectedYear = newObj;
    this.removeError("Year")
  }

  onChangeTeacher(newObj: number): void {
    this.searchTeacher = newObj;
    this.removeError("Teacher");
  }

  onChangeStudent(newObj: number): void {
    this.searchStudent = newObj;
    this.removeError("Student");
  }

  getTeacherReport(): void {
    if(this.selectedMonth == 0 ) {
      this.formErr["Month"] = ["Month can't be Blank"];
    }
    if(this.selectedYear == 0 ) {
      this.formErr["Year"] = ["Year can't be Blank"];
    }
    if(this.searchTeacher == 0 ) {
      this.formErr["Teacher"] = ["Teacher can't be Blank"];
    }
    if(Object.keys(this.formErr).length == 0) {
      this.router.navigate(['/reports/teachers/', this.searchTeacher , 'get-monthly-reports'], 
        { queryParams: { month: this.selectedMonth, year: this.selectedYear }});
    }
  }

  getStudentReport(): void {
    if(this.selectedMonth == 0 ) {
      this.formErr["Month"] = ["Month can't be Blank"];
    }
    if(this.selectedYear == 0 ) {
      this.formErr["Year"] = ["Year can't be Blank"];
    }

    if(this.searchStudent == 0 ) {
      this.formErr["Student"] = ["Student can't be Blank"];
    }
    if(Object.keys(this.formErr).length == 0) {
      this.router.navigate(['/students']);
    }
  }

  hasError(field: string): any {
    if(this.formErr == undefined) {
      return false
    }
    return (this.formErr[field] || []).length > 0
  }

  removeError(field: string): void {
    if(this.formErr != undefined && this.formErr[field] != undefined) {
      delete(this.formErr[field]);
    }
  }

  getErrorValue(field: string): any {
   if(this.formErr == undefined) {
      return []
    }
    return this.formErr[field] || []
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

  name(student: any): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }
}
