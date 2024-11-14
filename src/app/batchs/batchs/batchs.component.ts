import { Component, OnInit } from '@angular/core';
import {BatchService} from './../../service/batch.service';
import { LoginService } from './../../service/login.service';
import {Batch} from './../../interface/batch';


@Component({
  selector: 'app-batchs',
  templateUrl: './batchs.component.html',
  styleUrls: ['./batchs.component.css']
})


export class BatchsComponent  implements OnInit {

  public batchs: Batch[] = [];
  constructor(private batchService: BatchService, private loginService: LoginService){}


  ngOnInit(): void {
    this.loadBatchs();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
    if(error.status == 0) {
      this.loginService.toLogin();
    }
  }

  loadBatchs(): void {
    this.batchService.getBatchs().subscribe (
      (response: any) => this.assignBatch(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Batchs......')
    );
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
