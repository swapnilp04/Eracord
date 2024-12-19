import { Component, OnInit } from '@angular/core';
import { HostelService } from './../../service/hostel.service';
import { HostelRoomService } from './../../service/hostel-room.service';
import { LoginService } from './../../service/login.service';
import { Hostel } from './../../interface/hostel';
import { HostelRoom } from './../../interface/hostel-room';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  public hostel = {} as Hostel;
  public hostelRooms: HostelRoom[] = [];
  public id: any;
  
  public isLoading = true;
  public hostelId: number;
  

  constructor(private hostelService: HostelService, private route: ActivatedRoute, private location: Location, private router: Router, 
    private loginService: LoginService, private hostelRoomService: HostelRoomService, private alertService: AlertService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.hostelId = Number(param.get('id'));
      this.loadHostel(this.hostelId);
      this.getHostelRooms(this.hostelId);
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadHostel(hostelID: number): void {
    this.hostelService.getHostel(hostelID).subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostel......')
    );
  }

  getHostelRooms(hostelId: number): void {
    this.isLoading = true;
    this.hostelRoomService.getHostelRooms(hostelId).subscribe (
      (response: any) => this.assignHostelRooms(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    ); 
  }

  assignHostel(response: any) {
    this.hostel = response;
    this.isLoading = false;
  }

  assignHostelRooms(response: any) {
    this.hostelRooms = response
  }


  back(): void {
    this.router.navigate(['/hostels']);
  }

  name(): string {
    return `${this.hostel.name}`
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }

}
