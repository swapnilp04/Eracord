import { Component, OnInit, Input } from '@angular/core';
import { HostelRoomService } from './../../service/hostel-room.service';
import { HostelStudent } from './../../interface/hostel-student';
import { HostelRoom } from './../../interface/hostel-room';


@Component({
  selector: 'app-hostel-students',
  templateUrl: './hostel-students.component.html',
  styleUrls: ['./hostel-students.component.css']
})
export class HostelStudentsComponent implements OnInit{

  @Input() hostelId: number;
  @Input() hostelRoomId: any;
  @Input() hostelRoom: HostelRoom;
  public hostelStudents: HostelStudent[] = [];

  constructor(private hostelRoomService: HostelRoomService){}

  ngOnInit(): void {
    this.loadHostelStudent()
  }

  loadHostelStudent(): void {
    this.hostelRoomService.getHostelRoomStudents(this.hostelId, this.hostelRoomId).subscribe (
      (response: any) => this.assignHostelStudent(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostels......')
    );
  }

  assignHostelStudent(response: any) {
    this.hostelStudents = response;
  }
}
