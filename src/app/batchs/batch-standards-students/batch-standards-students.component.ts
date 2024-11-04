import { Component, OnInit } from '@angular/core';
import {BatchService} from './../../service/batch.service';
import {BatchStandardService} from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import {Batch} from './../../interface/batch';
import {BatchStandard} from './../../interface/batch-standard';
import {Student} from './../../interface/student';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-batch-standards-students',
  templateUrl: './batch-standards-students.component.html',
  styleUrls: ['./batch-standards-students.component.css']
})
export class BatchStandardsStudentsComponent {
  public batch = {} as Batch;
  public batchStandard = {} as BatchStandard;
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
  
  constructor(private batchService: BatchService, private BatchStandardService: BatchStandardService, private route: ActivatedRoute, private location: Location, private router: Router, 
    private loginService: LoginService){}

  ngOnInit(): void {    
    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
        this.alerts = this.defaultAlerts;
      }
    });

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      var batchID = Number(param.get('batch_id'));
      var batchStandardID = Number(param.get('id'));
      
      this.loadBatch(batchID);
      
      this.loadBatchStandard(batchID, batchStandardID);
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if(error.status == 500) {
      this.isLoading = true;
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

  loadBatchStandard(batchID: number, standardID: number): void {
    this.BatchStandardService.getBatchStandard(batchID, standardID).subscribe (
      (response: any) => this.assignBatchStandard(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Batch Standard......')
    );
  }

  
  assignBatch(response: any) {
    this.batch = response;
    this.isLoading = false;
  }

  assignBatchStandard(response: any) {
    this.batchStandard = response;
    this.isLoading = false;
  }

  back(): void {
    this.router.navigate(['/batchs']);
  }

  name(): string {
    return `${this.batch.name}`
  }

}

