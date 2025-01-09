import { Component, OnInit, Input } from '@angular/core';
import { HostelRoomService } from './../../service/hostel-room.service';
import { LoginService } from './../../service/login.service';
import { HostelRoom } from './../../interface/hostel-room';
import { AlertService } from '../../service/alert.service';
import { faPeopleRoof, faFilePen, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hostel-rooms',
  templateUrl: './hostel-rooms.component.html',
  styleUrls: ['./hostel-rooms.component.css']
})
export class HostelRoomsComponent implements OnInit{
  @Input() hostelId: number;
  faPeopleRoof = faPeopleRoof;
  faFilePen = faFilePen; 
  faFolderOpen = faFolderOpen;
  ngOnInit(): void {
    this.loadHostelRooms();
  }
  public hostelRooms: HostelRoom[] = [];
  constructor(private hostelRoomService: HostelRoomService, private loginService: LoginService, private alertService: AlertService){}
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
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  assignHostel(response: any) {
    this.hostelRooms = response
  }
}
