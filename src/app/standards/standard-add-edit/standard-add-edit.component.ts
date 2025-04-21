import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {StandardService} from './../../service/standard.service';
import { LoginService } from './../../service/login.service';
import {Standard} from './../../interface/standard';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import {  faChevronLeft, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-standard-add-edit',
  templateUrl: './standard-add-edit.component.html',
  styleUrls: ['./standard-add-edit.component.css']
})
export class StandardAddEditComponent {

  public standard = {} as Standard;
  public isNew = true;
  public isLoading = false;
  faChevronLeft = faChevronLeft;
  faCircleCheck = faCircleCheck;
  
  constructor(private standardService: StandardService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService){}


  createStandard(standard: Standard): void {
    this.isLoading = true;
    this.standardService.createStandard(standard).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateStandard(standard: Standard): void {
    this.isLoading = true;
    this.standardService.updateStandard(standard).subscribe (
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
        this.loadStandard(id);
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

  loadStandard(standardID: number): void {
    this.isLoading = true;
    this.standardService.getStandard(standardID).subscribe (
      (response: any) => this.assignStandard(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  back(): void {
    this.location.back();
  }

  getSuccess(response: any): void {
    this.router.navigate(['/standards', response['standard']['id']], { replaceUrl: true });
    this.alertService.success("Success");
  }

  getError(error: any): void {
    
  }

  assignStandard(response: any) {
    this.standard = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }
}
