import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {StandardService} from './../../service/standard.service';
import { LoginService } from './../../service/login.service';
import {Standard} from './../../interface/standard';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-standard-add-edit',
  templateUrl: './standard-add-edit.component.html',
  styleUrls: ['./standard-add-edit.component.css']
})
export class StandardAddEditComponent {

  public standard = {} as Standard;
  public isNew = true;
  
  constructor(private standardService: StandardService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService){}


  createStandard(standard: Standard): void {
    this.standardService.createStandard(standard).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standard......')
    );
  }

  updateStandard(standard: Standard): void {
    this.standardService.updateStandard(standard).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standard......')
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
    }
  }

  loadStandard(standardID: number): void {
    this.standardService.getStandard(standardID).subscribe (
      (response: any) => this.assignStandard(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standard......')
    );
  }

  back(): void {
    this.router.navigate(['/standards']);
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/standards/${response['standard']['id']}?success=true`;
    } else {
      window.location.href = `/standards/${response['standard']['id']}?isUpdate=true`;
    }
  }

  getError(error: any): void {
    
  }

  assignStandard(response: any) {
    this.standard = response;
  }

}
