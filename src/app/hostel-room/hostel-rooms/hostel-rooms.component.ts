import { Component, OnInit, Input } from '@angular/core';
import { HostelRoomService } from './../../service/hostel-room.service';
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
  constructor(private hostelRoomService: HostelRoomService){}
  loadHostelRooms(): void {
    this.hostelRoomService.getHostelRooms(this.hostelId).subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostels......')
    );
  }

  assignHostel(response: any) {
    this.hostelRooms = response
  }
}
