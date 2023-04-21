import { Component, OnInit } from '@angular/core';
import {StandardService} from './../../service/standard.service';
import {Standard} from './../../interface/standard';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent {
  public standard = {} as Standard;
  public id: any;
  dismissible = true;

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `Standard Created successfully. `
    }
  ];

  public alerts: Alert[] = [];
  public isLoading = true;
  
  constructor(private standardService: StandardService, private route: ActivatedRoute, private location: Location, private router: Router){}


  ngOnInit(): void {
    
    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
        this.alerts = this.defaultAlerts;
      }
    });

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      
      this.loadStandard(id);
    });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  loadStandard(standardID: number): void {
    this.standardService.getStandard(standardID).subscribe (
      (response: any) => this.assignStandard(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Standard......')
    );
  }

  
  assignStandard(response: any) {
    this.standard = response;
    this.isLoading = false;
  }

  back(): void {
    this.router.navigate(['/standards']);
  }

  name(): string {
    return `${this.standard.name}`
  }
}
