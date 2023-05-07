import { Component, OnInit } from '@angular/core';
import {BatchService} from './../../service/batch.service';
import { LoginService } from './../../service/login.service';
import {Batch} from './../../interface/batch';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent {
  public batch = {} as Batch;
  public id: any;
  dismissible = true;

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `Batch Created successfully. `
    }
  ];

  public alerts: Alert[] = [];
  public isLoading = true;
  
  constructor(private batchService: BatchService, private route: ActivatedRoute, private location: Location, private router: Router, 
    private loginService: LoginService){}


  ngOnInit(): void {
    
    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
        this.alerts = this.defaultAlerts;
      }
    });

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      
      this.loadBatch(id);
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

  loadBatch(batchID: number): void {
    this.batchService.getBatch(batchID).subscribe (
      (response: any) => this.assignBatch(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Batch......')
    );
  }

  
  assignBatch(response: any) {
    this.batch = response;
    this.isLoading = false;
  }

  back(): void {
    this.router.navigate(['/batchs']);
  }

  name(): string {
    return `${this.batch.name}`
  }
}
