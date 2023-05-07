import { Component, OnInit, Input } from '@angular/core';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { Batch } from './../../interface/batch';
import { BatchStandard } from './../../interface/batch-standard';

@Component({
  selector: 'app-batch-standards',
  templateUrl: './batch-standards.component.html',
  styleUrls: ['./batch-standards.component.css']
})
export class BatchStandardsComponent implements OnInit{

  @Input() batchId: any;
  public selectedBatchStandard: any;
  public batchStandards: BatchStandard[] = [];
  public isLoading: boolean = true

  constructor(private batchStandardService: BatchStandardService, private loginService: LoginService) {}
  
  ngOnInit(): void {
    this.loadBatchStandards()
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadBatchStandards(): void {
    this.batchStandardService.getBatchStandards(this.batchId).subscribe (
      (response: any) => this.assignBatchStandards(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostels......')
    );
  }

  assignBatchStandards(response: any) {
    this.batchStandards = response;
    this.isLoading = false;
  }

  selectBatchStandard(batchStandardId: any): void {
    this.selectedBatchStandard = batchStandardId;
  }
}
