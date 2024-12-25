import { Component, OnInit } from '@angular/core';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { BatchStandard } from './../../interface/batch-standard';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-report-logs',
  templateUrl: './report-logs.component.html',
  styleUrls: ['./report-logs.component.css']
})
export class ReportLogsComponent implements OnInit {
  public batchStandards: BatchStandard[] = [];
  public isLoading = false;  
  public searchDate: any;
  
  constructor(private loginService: LoginService,
    private batchStandardService: BatchStandardService,
    private alertService: AlertService){}

  ngOnInit(): void {
    //this.loadDefaultBatchStandards();
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
  }

  loadDefaultBatchStandards(): void {
    if(this.searchDate == undefined) {
      this.alertService.error("Please select Date")
      return;
    } else {
      this.alertService.clear();
    }
    this.batchStandardService.getDefaultBatchStandards().subscribe (
      (response: any) => this.assignBatchStandards(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting exams......')
    );
  }
  
  assignBatchStandards(response: any) {
    this.batchStandards = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }
}
