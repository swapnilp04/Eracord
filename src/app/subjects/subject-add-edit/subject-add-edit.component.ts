import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SubjectService } from './../../service/subject.service';
import { LoginService } from './../../service/login.service';
import { Subject } from './../../interface/subject';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-subject-add-edit',
  templateUrl: './subject-add-edit.component.html',
  styleUrls: ['./subject-add-edit.component.css']
})
export class SubjectAddEditComponent {
  public subject = {} as Subject;
  public standardId: number;
  public isNew = true;
  public isLoading = false;

  constructor(private subjectService: SubjectService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService){}

  createSubject(subject: Subject): void {
    this.isLoading = true;
    this.subjectService.createSubject(this.standardId, subject).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateSubject(subject: Subject): void {
    this.isLoading = true;
    this.subjectService.updateSubject(this.standardId, subject).subscribe (
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
      this.standardId = Number(param.get('standard_id'));
      if(!this.isNew) {
        this.loadSubject(id);
      }
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadSubject(subjectId: number): void {
    this.isLoading = true;
    this.subjectService.getSubject(this.standardId, subjectId).subscribe (
      (response: any) => this.assignSubject(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  back(): void {
    this.router.navigate(['/standards', this.standardId]);
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/standards/${this.standardId}`;
      this.alertService.success("Hostel Room Created Successful");
    } else {
      window.location.href = `/standards/${this.standardId}`;
      this.alertService.success("Hostel Room updated Successful");
    }
  }
 
  isLoadingFalse(): void {
    this.isLoading = false;    
  }

  assignSubject(response: any) {
    this.subject = response;
  }
}
