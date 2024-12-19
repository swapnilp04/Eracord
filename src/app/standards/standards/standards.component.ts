import { Component, OnInit } from '@angular/core';
import {StandardService} from './../../service/standard.service';
import { LoginService } from './../../service/login.service';
import {Standard} from './../../interface/standard';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.css']
})

export class StandardsComponent  implements OnInit {

  public standards: Standard[] = [];
  constructor(private standardService: StandardService, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadStandards();
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

  loadStandards(): void {
    this.standardService.getStandards().subscribe (
      (response: any) => this.assignStandard(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standards......')
    );
  }

  assignStandard(response: any) {
    this.standards = response
  }
}
