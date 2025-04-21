import { Component, OnInit, Input } from '@angular/core';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { Batch } from './../../interface/batch';
import { BatchStandard } from './../../interface/batch-standard';
import { AlertService } from '../../service/alert.service';
import { faFilePen, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-batch-standards',
  templateUrl: './batch-standards.component.html',
  styleUrls: ['./batch-standards.component.css']
})
export class BatchStandardsComponent implements OnInit{

  @Input() batchId: any;
  public batchStandards: BatchStandard[] = [];
  public isLoading: boolean = true
  faFilePen = faFilePen;
  faFolderOpen = faFolderOpen;

  constructor(private batchStandardService: BatchStandardService, private loginService: LoginService,  private alertService: AlertService) {}
  
  ngOnInit(): void {
    this.loadBatchStandards()
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
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

  deactivateBatchStandard(batchStandard: any):void {
    if(confirm("Are you sure to Deactivate Batch Standard?")) {
      this.batchStandardService.deactivateBatchStandard(this.batchId, batchStandard).subscribe (
        (response: any) => batchStandard.is_active = false,
        (error: any) => this.errorHandle(error),
        () => console.log('Done ......')
      );  
    }
  }

  activateBatchStandard(batchStandard: any):void {
    if(confirm("Are you sure to Activate Batch Standard?")) {
      this.batchStandardService.activateBatchStandard(this.batchId, batchStandard).subscribe (
        (response: any) => batchStandard.is_active = true,
        (error: any) => this.errorHandle(error),
        () => console.log('Done ......')
      );
    }
  }
}
