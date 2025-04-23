import { Component, OnInit } from '@angular/core';
import {BatchService} from './../../service/batch.service';
import { LoginService } from './../../service/login.service';
import {Batch} from './../../interface/batch';
import { AlertService } from '../../service/alert.service';
import { faFilePen, faFolderOpen, faSquarePlus, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-batchs',
  templateUrl: './batchs.component.html',
  styleUrls: ['./batchs.component.css']
})


export class BatchsComponent  implements OnInit {

  public batchs: Batch[] = [];
  faFilePen = faFilePen;
  faFolderOpen = faFolderOpen;
  faSquarePlus = faSquarePlus;
  faUsers = faUsers;
  isLoading = true;

  constructor(private batchService: BatchService, private loginService: LoginService, private alertService: AlertService){}


  ngOnInit(): void {
    this.loadBatchs();
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

  loadBatchs(): void {
    this.isLoading = true;
    this.batchService.getBatchs().subscribe (
      (response: any) => this.assignBatch(response),
      (error: any) => this.errorHandle(error),
      () => this.disableLoading()
    );
  }

  disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  loadBatch(batchID: number): void {
    this.batchService.getBatch(batchID).subscribe (
      (response: any) => console.log(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Batch......')
    );
  }

  createBatch(batch: Batch): void {
    this.batchService.createBatch(batch).subscribe (
      (response: any) => console.log(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Batch......')
    );
  }

    assignBatch(response: any) {
      this.batchs = response
    }
}
