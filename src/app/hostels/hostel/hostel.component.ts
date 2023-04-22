import { Component, OnInit } from '@angular/core';
import {HostelService} from './../../service/hostel.service';
import {Hostel} from './../../interface/hostel';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.component.html',
  styleUrls: ['./hostel.component.css']
})

export class HostelComponent {
  public hostel = {} as Hostel;
  public id: any;
  dismissible = true;

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `Hostel Created successfully. `
    }
  ];

  public alerts: Alert[] = [];
  public isLoading = true;
  
  constructor(private hostelService: HostelService, private route: ActivatedRoute, private location: Location, private router: Router){}


  ngOnInit(): void {
    
    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
        this.alerts = this.defaultAlerts;
      }
    });

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      
      this.loadHostel(id);
    });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  loadHostel(hostelID: number): void {
    this.hostelService.getHostel(hostelID).subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostel......')
    );
  }

  
  assignHostel(response: any) {
    this.hostel = response;
    this.isLoading = false;
  }

  back(): void {
    this.router.navigate(['/hostels']);
  }

  name(): string {
    return `${this.hostel.name}`
  }
}
