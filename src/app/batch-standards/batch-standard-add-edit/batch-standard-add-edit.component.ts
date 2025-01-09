import { Component, OnInit } from '@angular/core';
import { BatchService } from './../../service/batch.service';
import { StandardService } from './../../service/standard.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { Batch } from './../../interface/batch';
import { BatchStandard } from './../../interface/batch-standard';
import { Standard } from './../../interface/standard';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import {  faChevronLeft, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-batch-standard-add-edit',
  templateUrl: './batch-standard-add-edit.component.html',
  styleUrls: ['./batch-standard-add-edit.component.css']
})

export class BatchStandardAddEditComponent implements OnInit {
  public batch = {} as Batch;
  public batchStandard = {} as BatchStandard;
  public standards: Standard[] = [];
  public isNew = true;
  faChevronLeft = faChevronLeft;
  faCircleCheck = faCircleCheck;
  public isLoading = false;
  
  constructor(private batchService: BatchService, private batchStandardService: BatchStandardService, private loginService: LoginService,
    private route: ActivatedRoute, private location: Location, private router: Router, private standardService: StandardService,
    private alertService: AlertService){}


  ngOnInit(): void {
    
    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    }

    this.route.paramMap.subscribe((param) => {
      this.batchStandard.batch_id = Number(param.get('batch_id'));
      this.loadBatch(this.batchStandard.batch_id);
      this.loadStandards(this.batchStandard.batch_id);
      if(!this.isNew) { 
        this.loadBatchStandard(this.batchStandard.batch_id, Number(param.get('id')));
      }
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadBatch(batchID: number): void {
    this.isLoading = true;
    this.batchService.getBatch(batchID).subscribe (
      (response: any) => this.assignBatch(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  
  loadStandards(batchID: number): void {
    this.isLoading = true;
    var service: any;
    if(this.isNew){
      service = this.batchService;
    } else {
      service = this.standardService;
    }
    service.getStandards(batchID).subscribe (
      (response: any) => this.assignStandards(response),
      (error: any) => console.log(error),
      () => this.isLoadingFalse()
    );
  }

  loadBatchStandard(batchID: number, batchStandardId: number): void {
    this.isLoading = true;
    this.batchStandardService.getBatchStandard(batchID, batchStandardId).subscribe (
      (response: any) => this.assignbatchStandard(response),
      (error: any) => console.log(error),
      () => this.isLoadingFalse()
    );
  }

  assignbatchStandard(response: any) {
    this.batchStandard = response;
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
    if(this.isNew) {
      this.batchStandard.standard_id = id;
    }
  }
  
  createBatchStandard(): void {
    this.isLoading = true;
    this.batchStandardService.createBatchStandard(this.batch.id, this.batchStandard).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateBatchStandard(): void {
    this.isLoading = true;
    this.batchStandardService.updateBatchStandard(this.batch.id, this.batchStandard).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/batchs/${response['batch_standard']['batch_id']}?success=true`;
      this.alertService.success("Standard has been assigned to Batch Successful");
    } else {
      window.location.href = `/batchs/${response['batch_standard']['batch_id']}?isUpdate=true`;
      this.alertService.success("Standard has been assigned to Batch Successful");
    }
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }
}
