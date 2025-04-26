import { Component, OnInit } from '@angular/core';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { Batch } from './../../interface/batch';
import { BatchStandard } from './../../interface/batch-standard';
import { AlertService } from '../../service/alert.service';
import { faFilePen, faFolderOpen, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-active-standards',
  templateUrl: './active-standards.component.html',
  styleUrls: ['./active-standards.component.css']
})
export class ActiveStandardsComponent implements OnInit {
  public batchStandards: BatchStandard[] = [];
  public isLoading: boolean = true
  faFilePen = faFilePen;
  faFolderOpen = faFolderOpen;
  faBookOpenReader = faBookOpenReader;

  constructor(private batchStandardService: BatchStandardService, private loginService: LoginService,  private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadActiveBatchStandards()
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
    this.isLoading = false;
  }

  loadActiveBatchStandards(): void {
    this.isLoading = true;
    this.batchStandardService.getActiveBatchStandards().subscribe (
      (response: any) => this.assignBatchStandards(response),
      (error: any) => this.errorHandle(error),
      () => this.disableLoading()
    );
  }

  disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  assignBatchStandards(response: any) {
    this.batchStandards = response;
  }
}
