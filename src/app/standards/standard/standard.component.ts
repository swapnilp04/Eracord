import { Component, OnInit } from '@angular/core';
import {StandardService} from './../../service/standard.service';
import { LoginService } from './../../service/login.service';
import {Standard} from './../../interface/standard';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent {
  public standard = {} as Standard;
  public id: any;
  public isLoading = true;
  faChevronLeft = faChevronLeft;
  
  constructor(private standardService: StandardService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}


  ngOnInit(): void {
    
    this.route.queryParams.subscribe((param) => {
      this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      
      this.loadStandard(id);
      });
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
    this.standardService.getStandard(standardID).subscribe (
      (response: any) => this.assignStandard(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standard......')
    );
  }

  
  assignStandard(response: any) {
    this.standard = response;
    this.isLoading = false;
  }

  back(): void {
    this.router.navigate(['/standards']);
  }

  name(): string {
    return `${this.standard.name}`
  }
}
