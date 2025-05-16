import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ParentService } from './../../service/parent.service';
import { LoginService } from './../../service/login.service';
import { Parent } from './../../interface/parent';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import {  faChevronLeft, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-parent-add-edit',
  templateUrl: './parent-add-edit.component.html',
  styleUrls: ['./parent-add-edit.component.css']
})
export class ParentAddEditComponent {

  public parent = {} as Parent;
  public isNew = true;
  public isLoading = false;
  public formErr: any;
  faChevronLeft = faChevronLeft;
  faCircleCheck = faCircleCheck;

  constructor(private parentService: ParentService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService){}

  createParent(parent: Parent): void {
    this.isLoading = true;
    this.parentService.createParent(parent).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateParent(parent: Parent): void {
    this.isLoading = true;
    this.parentService.updateParent(parent).subscribe (
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
        this.loadParent(id);
      }
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    } else {
      this.assignErrors(error);
    }
    this.isLoadingFalse()
  }

  loadParent(parentID: number): void {
    this.isLoading = true;
    this.parentService.getParent(parentID).subscribe (
      (response: any) => this.assignParent(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  hasError(field: string): any {
    if(this.formErr == undefined) {
      return false
    }
    return (this.formErr[field] || []).length > 0
  }

  getErrorValue(field: string): any {
   if(this.formErr == undefined) {
      return []
    }
    return this.formErr[field] || []
  }

  assignErrors(error: any): void {
    this.formErr = error.error.error
    console.log(error.error.error);
    this.isLoadingFalse()
  }

  back(): void {
    this.location.back();
  }

  removeError(field: string): void {
    if(this.formErr != undefined && this.formErr[field] != undefined) {
      delete(this.formErr[field]);
    }
  }

  getSuccess(response: any): void {
    this.router.navigate(['/parents', response['parent']['id']], { replaceUrl: true });
  }

  getError(error: any): void {
   
  }

  assignParent(response: any) {
    this.parent = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }
}
