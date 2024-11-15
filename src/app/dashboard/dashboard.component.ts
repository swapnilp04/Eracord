import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from './../service/login.service';
import { HostelService } from './../service/hostel.service';
import { HostelStudent } from './../interface/hostel-student';
import { HostelRoom } from './../interface/hostel-room';
import {Student} from './../interface/student';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public hostelStudents: HostelStudent[] = [];

  constructor(private hostelService: HostelService, private loginService: LoginService){}

  ngOnInit(): void {
    this.loadHostelStudent()
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadHostelStudent(): void {
    this.hostelService.getHostelEarlyExpireStudents().subscribe (
      (response: any) => this.assignHostelStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostels......')
    );
  }

  assignHostelStudent(response: any) {
    this.hostelStudents = response;
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

}
