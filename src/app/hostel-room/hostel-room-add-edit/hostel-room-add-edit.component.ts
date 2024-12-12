import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {HostelRoomService} from './../../service/hostel-room.service';
import { LoginService } from './../../service/login.service';
import {HostelRoom} from './../../interface/hostel-room';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-hostel-room-add-edit',
  templateUrl: './hostel-room-add-edit.component.html',
  styleUrls: ['./hostel-room-add-edit.component.css']
})
export class HostelRoomAddEditComponent {
  public hostelRoom = {} as HostelRoom;
  public isNew = true;
  public hostelId: number;
  public isLoading = false;
  
  constructor(private hostelRoomService: HostelRoomService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService){}


  createHostelRoom(hostelRoom: HostelRoom): void {
    this.isLoading = true;
    this.hostelRoomService.createHostelRoom(this.hostelId, hostelRoom).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateHostelRoom(hostelRoom: HostelRoom): void {
    this.isLoading = true;
    this.hostelRoomService.updateHostelRoom(this.hostelId, hostelRoom).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
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

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadHostelRoom(hostelRoomID: number): void {
    this.isLoading = true;
    this.hostelRoomService.getHostelRoom(this.hostelId, hostelRoomID).subscribe (
      (response: any) => this.assignHostelRoom(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  back(): void {
    this.router.navigate(['/hostels', this.hostelId]);
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/hostels/${response['hostelRoom']['hostel_id']}?success=true`;
      this.alertService.success("Hostel Room Created Successful");
    } else {
      window.location.href = `/hostels/${response['hostelRoom']['hostel_id']}?isUpdate=true`;
      this.alertService.success("Hostel Room updated Successful");
    }
  }

  getError(error: any): void {
    
  }

  assignHostelRoom(response: any) {
    this.hostelRoom = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }
}
