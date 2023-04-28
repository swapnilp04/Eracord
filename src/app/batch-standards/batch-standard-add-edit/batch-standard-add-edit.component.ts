import { Component, OnInit } from '@angular/core';
import { BatchService } from './../../service/batch.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { Batch } from './../../interface/batch';
import { BatchStandard } from './../../interface/batch-standard';
import { Standard } from './../../interface/standard';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-batch-standard-add-edit',
  templateUrl: './batch-standard-add-edit.component.html',
  styleUrls: ['./batch-standard-add-edit.component.css']
})

export class BatchStandardAddEditComponent implements OnInit{
  public batch = {} as Batch;
  public batchStandard = {} as BatchStandard;
  public standards: Standard[] = [];
    public isNew = true;
  dismissible = true;

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `Batch Created successfully. `
    }
  ];

  public alerts: Alert[] = [];
  public isLoading = true;
  

  constructor(private batchService: BatchService, private batchStandardService: BatchStandardService, private route: ActivatedRoute, private location: Location, private router: Router){}


  ngOnInit(): void {
    
    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    }

    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
        this.alerts = this.defaultAlerts;
      }
    });

    this.route.paramMap.subscribe((param) => {
      this.batchStandard.batch_id = Number(param.get('batch_id'));
      this.loadBatch(this.batchStandard.batch_id);
      this.loadStandards(this.batchStandard.batch_id);
    });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  loadBatch(batchID: number): void {
    this.batchService.getBatch(batchID).subscribe (
      (response: any) => this.assignBatch(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Batch......')
    );
  }

  
  loadStandards(batchID: number): void {
    this.batchService.getStandards(batchID).subscribe (
      (response: any) => this.assignStandards(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Batch......')
    );
  }
  
  assignStandards(response: any) {
    this.standards = response;
  }

  assignBatch(response: any) {
    this.batch = response;
    this.isLoading = false;
  }

  back(): void {
    this.router.navigate(['/batchs', this.batch.id]);
  }

  name(): string {
    return `${this.batch.name}`
  }

  selectStandard(id: any): void {
    this.batchStandard.standard_id = id;
  }
  
  createBatchStandard(): void {
    this.batchStandardService.createBatchStandard(this.batch.id, this.batchStandard).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Batch......')
    );
  }

  getSuccess(response: any): void {
    window.location.href = `/batchs/${response['batch_standard']['batch_id']}?success=true`;
  }
}
