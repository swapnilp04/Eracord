import { Component, OnInit } from '@angular/core';
import {BatchService} from './../../service/batch.service';
import { LoginService } from './../../service/login.service';
import {Batch} from './../../interface/batch';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft, faCity} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent {
  public batch = {} as Batch;
  public id: any;
  
  public isLoading = true;
  faChevronLeft = faChevronLeft;
  faCity = faCity;
  
  constructor(private batchService: BatchService, private route: ActivatedRoute, private location: Location, private router: Router, 
    private loginService: LoginService,  private alertService: AlertService){}


  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      
      this.loadBatch(id);
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
    this.batchService.getBatch(batchID).subscribe (
      (response: any) => this.assignBatch(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Batch......')
    );
  }

  
  assignBatch(response: any) {
    this.batch = response;
    this.isLoading = false;
  }

  back(): void {
    this.router.navigate(['/batchs']);
  }

  name(): string {
    return `${this.batch.name}`
  }
}
