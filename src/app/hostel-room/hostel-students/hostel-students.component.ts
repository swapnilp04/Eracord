import { Component, OnInit, Input } from '@angular/core';
import { HostelRoomService } from './../../service/hostel-room.service';
import { LoginService } from './../../service/login.service';
import { HostelStudent } from './../../interface/hostel-student';
import { HostelRoom } from './../../interface/hostel-room';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-hostel-students',
  templateUrl: './hostel-students.component.html',
  styleUrls: ['./hostel-students.component.css']
})
export class HostelStudentsComponent implements OnInit{

  @Input() hostelId: number;
  @Input() hostelRoomId: any;
  @Input() hostelRoom: HostelRoom;
  @Input() showAmount: any;
  public hostelStudents: HostelStudent[] = [];

  constructor(private hostelRoomService: HostelRoomService, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadHostelStudent()
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadHostelStudent(): void {
    this.hostelRoomService.getHostelRoomStudents(this.hostelId, this.hostelRoomId).subscribe (
      (response: any) => this.assignHostelStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostels......')
    );
  }

  assignHostelStudent(response: any) {
    this.hostelStudents = response;
  }
}
