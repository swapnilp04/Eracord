import { Component, OnInit } from '@angular/core';
import {StudentService} from './../service/student.service';
import {Student} from './../interface/student';
import { Alert } from './../interface/alert';
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
  public id: any;
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
  
  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location, private router: Router){}


  ngOnInit(): void {
    
    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
        this.alerts = this.defaultAlerts;
      }
    });

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      
      this.loadStudent(id);
    });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onSelect(data: TabDirective): void {
    this.value = data.heading;
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  }

  loadStudentHostel(studentID: any): void {
    this.studentService.getStudentHostel(studentID).subscribe (
      (response: any) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  }

  assignStudent(response: any) {
    this.student = response;
    this.isLoading = false;
    this.loadStudentHostel(this.student['id']);
  }

  back(): void {
    this.router.navigate(['/students']);
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }
}
