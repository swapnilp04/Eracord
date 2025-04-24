import { Component, OnInit } from '@angular/core';
import { SubjectService } from './../../service/subject.service';
import { LoginService } from './../../service/login.service';
import { Subject } from './../../interface/subject';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {

  public subject = {} as Subject;
  public id: any;
  public standardId: any;
  public isLoading = true;
  faChevronLeft = faChevronLeft;

  constructor(private subjectService: SubjectService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {    
    this.route.queryParams.subscribe((param) => {
      this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.standardId = Number(param.get('standard_id'));
      
      this.loadSubject(this.standardId, id);
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

  loadSubject(standardId: number, subjectId: number): void {
    this.subjectService.getSubject(standardId, subjectId).subscribe (
      (response: any) => this.assignSubject(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Subject......')
    );
  }

  assignSubject(response: any) {
    this.subject = response;
    this.isLoading = false;
  }

  back(): void {
    this.location.back();
  }
}
