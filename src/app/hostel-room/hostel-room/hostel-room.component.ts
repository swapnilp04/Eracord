import { Component, OnInit } from '@angular/core';
import {HostelRoomService} from './../../service/hostel-room.service';
import { LoginService } from './../../service/login.service';
import {HostelRoom} from './../../interface/hostel-room';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hostel-room',
  templateUrl: './hostel-room.component.html',
  styleUrls: ['./hostel-room.component.css']
})

export class HostelRoomComponent implements OnInit{


  public hostelRoom = {} as HostelRoom;
  public id: any;
  public hostelId: any;
  dismissible = true;

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `HostelRoom Created successfully. `
    }
  ];

  public alerts: Alert[] = [];
  public isLoading = true;
  public hostelRoomId: number;
  
  constructor(private hostelRoomService: HostelRoomService, private route: ActivatedRoute, private location: Location, private router: Router, 
    private loginService: LoginService){}


  ngOnInit(): void {
    
    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
        this.alerts = this.defaultAlerts;
      }
    });

    this.route.paramMap.subscribe((param) => {
      this.hostelId = Number(param.get('hostel_id'));
      this.id = Number(param.get('id'));
      this.loadHostelRoom(this.id);
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

  loadHostelRoom(hostelRoomID: number): void {
    this.hostelRoomService.getHostelRoom(this.hostelId, hostelRoomID).subscribe (
      (response: any) => this.assignHostelRoom(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting HostelRoom......')
    );
  }

  assignHostelRoom(response: any) {
    this.hostelRoom = response;
    this.isLoading = false;
  }

  back(): void {
    this.router.navigate(['/hostels', this.hostelId]);
  }

  name(): string {
    return `${this.hostelRoom.name}`
  }
}
