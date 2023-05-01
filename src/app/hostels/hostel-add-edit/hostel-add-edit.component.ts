import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {HostelService} from './../../service/hostel.service';
import {Hostel} from './../../interface/hostel';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-hostel-add-edit',
  templateUrl: './hostel-add-edit.component.html',
  styleUrls: ['./hostel-add-edit.component.css']
})
export class HostelAddEditComponent {

  public hostel = {} as Hostel;
  public isNew = true;
  
  constructor(private hostelService: HostelService, private location: Location, private router: Router, private route: ActivatedRoute){}


  createHostel(hostel: Hostel): void {
    this.hostelService.createHostel(hostel).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostel......')
    );
  }

  updateHostel(hostel: Hostel): void {
    this.hostelService.updateHostel(hostel).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostel......')
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

  loadHostel(hostelID: number): void {
    this.hostelService.getHostel(hostelID).subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostel......')
    );
  }

  back(): void {
    this.router.navigate(['/hostels', this.hostel.id]);
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

  assignHostel(response: any) {
    this.hostel = response;
  }

}
