import { Component, OnInit } from '@angular/core';
import {HostelService} from './../../service/hostel.service';
import { LoginService } from './../../service/login.service';
import {Hostel} from './../../interface/hostel';
import { AlertService } from '../../service/alert.service';
import { faHotel, faFilePen, faFolderOpen, faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.css']
})

export class HostelsComponent  implements OnInit {
  public hostels: Hostel[] = [];
  faHotel = faHotel;
  faFolderOpen = faFolderOpen;
  faFilePen = faFilePen;
  faPrint = faPrint;
  isLoading = true;

  constructor(private hostelService: HostelService, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadHostels();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
    if(error.status == 0) {
      this.loginService.toLogin();
    }
    this.isLoading = false;
  }

  loadHostels(): void {
    this.isLoading = true;
    this.hostelService.getHostels().subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => this.errorHandle(error),
      () => this.disableLoading()
    );
  }

  disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  assignHostel(response: any) {
    this.hostels = response
  }

  isEdit(): boolean { 
    return this.loginService.isAdmin();
  }
}
