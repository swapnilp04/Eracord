import { Component, OnInit, Input } from '@angular/core';
import { HostelRoomService } from './../../service/hostel-room.service';
import { LoginService } from './../../service/login.service';
import { HostelRoom } from './../../interface/hostel-room';

@Component({
  selector: 'app-hostel-rooms',
  templateUrl: './hostel-rooms.component.html',
  styleUrls: ['./hostel-rooms.component.css']
})
export class HostelRoomsComponent implements OnInit{
  @Input() hostelId: number;
  ngOnInit(): void {
    this.loadHostelRooms();
  }
  public hostelRooms: HostelRoom[] = [];
  constructor(private hostelRoomService: HostelRoomService, private loginService: LoginService){}
  loadHostelRooms(): void {
    this.hostelRoomService.getHostelRooms(this.hostelId).subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostels......')
    );
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  assignHostel(response: any) {
    this.hostelRooms = response
  }
}
