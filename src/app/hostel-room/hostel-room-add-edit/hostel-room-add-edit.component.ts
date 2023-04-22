import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {HostelRoomService} from './../../service/hostel-room.service';
import {HostelRoom} from './../../interface/hostel-room';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-hostel-room-add-edit',
  templateUrl: './hostel-room-add-edit.component.html',
  styleUrls: ['./hostel-room-add-edit.component.css']
})
export class HostelRoomAddEditComponent {
  public hostelRoom = {} as HostelRoom;
  public isNew = true;
  public hostelId: number ;
  
  constructor(private hostelRoomService: HostelRoomService, private location: Location, private router: Router, private route: ActivatedRoute){}


  createHostelRoom(hostelRoom: HostelRoom): void {
    this.hostelRoomService.createHostelRoom(this.hostelId, hostelRoom).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => console.log(error),
      () => console.log('Done getting HostelRoom......')
    );
  }

  updateHostelRoom(hostelRoom: HostelRoom): void {
    this.hostelRoomService.updateHostelRoom(this.hostelId, hostelRoom).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => console.log(error),
      () => console.log('Done getting HostelRoom......')
    );
  }

  ngOnInit(): void {
    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    }

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.hostelId = Number(param.get('hostel_id'));
      if(!this.isNew) {
        this.loadHostelRoom(id);
      }
    });
  }

  loadHostelRoom(hostelRoomID: number): void {
    this.hostelRoomService.getHostelRoom(hostelRoomID).subscribe (
      (response: any) => this.assignHostelRoom(response),
      (error: any) => console.log(error),
      () => console.log('Done getting HostelRoom......')
    );
  }

  back(): void {
    this.router.navigate(['/hostels', this.hostelId]);
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/hostels/${response['hostel']['id']}?success=true`;
    } else {
      window.location.href = `/hostels/${response['hostel']['id']}?isUpdate=true`;
    }
  }

  getError(error: any): void {
    
  }

  assignHostelRoom(response: any) {
    this.hostelRoom = response;
  }

}
