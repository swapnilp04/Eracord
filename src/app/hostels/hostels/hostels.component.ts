import { Component, OnInit } from '@angular/core';
import {HostelService} from './../../service/hostel.service';
import { LoginService } from './../../service/login.service';
import {Hostel} from './../../interface/hostel';


@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.css']
})


export class HostelsComponent  implements OnInit {

  public hostels: Hostel[] = [];
  constructor(private hostelService: HostelService, private loginService: LoginService){}



  ngOnInit(): void {
    this.loadHostels();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadHostels(): void {
    this.hostelService.getHostels().subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostels......')
    );
  }


  assignHostel(response: any) {
    this.hostels = response
  }
}
