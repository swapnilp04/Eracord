import { Component, OnInit } from '@angular/core';
import { ParentService } from './../../service/parent.service';
import { LoginService } from './../../service/login.service';
import { Parent } from './../../interface/parent';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  public parent = {} as Parent;
  public id: any;
  public isLoading = true;
  faChevronLeft = faChevronLeft;

  constructor(private parentService: ParentService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {    
    this.route.queryParams.subscribe((param) => {
      this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      
      this.loadParent(id);
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

  loadParent(parentID: number): void {
    this.parentService.getParent(parentID).subscribe (
      (response: any) => this.assignParent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Parent......')
    );
  }
 
  assignParent(response: any) {
    this.parent = response;
    this.isLoading = false;
  }

  back(): void {
    this.location.back();
  }

}
