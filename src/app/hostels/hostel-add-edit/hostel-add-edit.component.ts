import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {HostelService} from './../../service/hostel.service';
import { LoginService } from './../../service/login.service';
import {Hostel} from './../../interface/hostel';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-hostel-add-edit',
  templateUrl: './hostel-add-edit.component.html',
  styleUrls: ['./hostel-add-edit.component.css']
})
export class HostelAddEditComponent {

  public hostel = {} as Hostel;
  public isNew = true;
  public isLoading = false;
  
  constructor(private hostelService: HostelService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService){}


  createHostel(hostel: Hostel): void {
    this.isLoading = true;
    this.hostelService.createHostel(hostel).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateHostel(hostel: Hostel): void {
    this.isLoading = true;
    this.hostelService.updateHostel(hostel).subscribe (
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
      if(!this.isNew) {
        this.loadHostel(id);
      }
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadHostel(hostelID: number): void {
    this.isLoading = true;
    this.hostelService.getHostel(hostelID).subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  back(): void {
    if(this.isNew) {
      this.router.navigate(['/hostels']);
    }else {
      this.router.navigate(['/hostels', this.hostel.id]);
    }
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/hostels/${response['hostel']['id']}?success=true`;
      this.alertService.success("Hostel Created Successful");
    } else {
      window.location.href = `/hostels/${response['hostel']['id']}?isUpdate=true`;
      this.alertService.success("Hostel updated Successful");
    }
  }

  getError(error: any): void {
    
  }

  assignHostel(response: any) {
    this.hostel = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }
}
