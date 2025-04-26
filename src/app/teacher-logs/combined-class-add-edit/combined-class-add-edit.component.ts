import { Component, OnInit, Input } from '@angular/core';
import { CombinedClass } from './../../interface/combined-class';
import { BatchStandard } from './../../interface/batch-standard';
import { Subject } from './../../interface/subject';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-combined-class-add-edit',
  templateUrl: './combined-class-add-edit.component.html',
  styleUrls: ['./combined-class-add-edit.component.css']
})
export class CombinedClassAddEditComponent {

  @Input() combinedClass: any;
  @Input() batchStandards: BatchStandard[];

  public subjects: Subject[] = [];

  constructor(private batchStandardService: BatchStandardService, private loginService: LoginService, 
    private alertService: AlertService){}


  onChangeBatchStandard(newObj: number): void {
    this.combinedClass.batch_standard_id = newObj;
    this.combinedClass.subject_id = 0;
    if(newObj != 0) {
      this.loadSubjects(newObj);
    } else {
      while(this.subjects.length > 0) {
        this.subjects.pop();
      }
    }
  }

  loadSubjects(newObj: number): void {
    this.batchStandardService.getBatchStandardSubjects(newObj).subscribe (
      (response: any) => this.assignSubjects(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Subjects......')
    );
  }

  assignSubjects(response: any) {
    this.subjects = response;
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    } else if (error.status == 500) { 
      this.alertService.error(error.error.meaasge);
    } else if (error.status == 400) {
      
    }
  }

  onChangeSubject(newObj: number): void {
    this.combinedClass.subject_id = newObj;
  }

}
