import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {BatchService} from './../../service/batch.service';
import { LoginService } from './../../service/login.service';
import {Batch} from './../../interface/batch';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import {  faChevronLeft, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-batch-add-edit',
  templateUrl: './batch-add-edit.component.html',
  styleUrls: ['./batch-add-edit.component.css']
})
export class BatchAddEditComponent {

  public batch = {} as Batch;
  public isNew = true;
  public isLoading = false;
  faChevronLeft = faChevronLeft;
  faCircleCheck = faCircleCheck;
  
  constructor(private batchService: BatchService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService){}


  createBatch(batch: Batch): void {
    this.isLoading = true;
    this.batchService.createBatch(batch).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateBatch(batch: Batch): void {
    this.isLoading = true;
    this.batchService.updateBatch(batch).subscribe (
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
        this.loadBatch(id);
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

  back(): void {
    this.location.back();
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/batchs/${response['batch']['id']}?success=true`;
      this.alertService.success("New Batch has been Created Successful");
    } else {
      window.location.href = `/batchs/${response['batch']['id']}?isUpdate=true`;
      this.alertService.success("Batch has been updated Successful");
    }
  }

  getError(error: any): void {
    
  }

  assignBatch(response: any) {
    this.batch = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }

}
