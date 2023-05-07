import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Student } from './../../interface/student';
import { BatchStandardStudent } from './../../interface/batch-standard-student';
import { HostelStudent } from './../../interface/hostel-student';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TabDirective } from 'ngx-bootstrap/tabs';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent  implements OnInit {

  public student = {} as Student;
  public hostelStudent = {} as HostelStudent;
  public batchStandardStudents: BatchStandardStudent[] = [];
  public id: any;
  public classLoaded: boolean = false;
  dismissible = true;

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `Sutdent Created successfully. `
    }
  ];

  public alerts: Alert[] = [];
  public isLoading = true;

  value?: string;
  public hasHostel: boolean = false;
  
  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService){}


  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
        this.alerts = this.defaultAlerts;
      }
    });
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));      
      this.loadStudent(this.id);
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onSelect(data: TabDirective): void {
    this.value = data.heading;
    if(this.value == 'Class' && !this.classLoaded)  {
      this.classLoaded = true;
      this.loadStudentBatchStandards(this.id);
    }
  }

  loadStudentBatchStandards(studentID: number): void {
    this.studentService.getStudentBatchStandards(studentID).subscribe (
      (response: any) => this.assignStudentBatchStandard(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  loadStudentHostel(studentID: any): void {
    this.studentService.getStudentHostel(studentID).subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostel......')
    );
  }

  assignStudent(response: any) {
    this.student = response;
    this.isLoading = false;
    this.loadStudentHostel(this.student['id']);
  }

  assignHostel(response: any): void {
    this.hasHostel = true;
    this.hostelStudent = response;
  }

  assignStudentBatchStandard(response: any): void {
    this.batchStandardStudents = response;
  }

  back(): void {
    this.router.navigate(['/students']);
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }
}
