import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ExamService } from './../../service/exam.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { Exam } from './../../interface/exam';
import { BatchStandard } from './../../interface/batch-standard';
import { Subject } from './../../interface/subject';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import {  faChevronLeft, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam-add-edit',
  templateUrl: './exam-add-edit.component.html',
  styleUrls: ['./exam-add-edit.component.css']
})
export class ExamAddEditComponent implements OnInit{
  public exam = {} as Exam;
  public defaultBatchStandards: BatchStandard[] = [];
  public subjects: Subject[] = [];
  public isNew = true;
  public isLoading = false;
  public formErr: any;
  faChevronLeft = faChevronLeft;
  faCircleCheck = faCircleCheck;
  
  constructor(private examService: ExamService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private batchStandardService: BatchStandardService,
    private alertService: AlertService) {}

  createExam(exam: Exam): void {
    this.isLoading = true;
    this.examService.createExam(exam).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateExam(exam: Exam): void {
    this.isLoading = true;
    this.examService.updateExam(exam).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  ngOnInit(): void {
    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    }
    this.exam.exam_type = "Objective"
    this.loadDefaultBatchStandards();

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      if(!this.isNew) {
        this.loadExam(id);
      }
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    } else if (error.status == 400){
      this.assignErrors(error);
    }
  }

  removeError(field: string): void {
    if(this.formErr != undefined && this.formErr[field] != undefined) {
      delete(this.formErr[field]);
    }
  }

  assignErrors(error: any): void {
    this.formErr = error.error.error;
    this.isLoadingFalse();
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

  loadDefaultBatchStandards(): void {
    this.batchStandardService.getDefaultBatchStandards().subscribe (
      (response: any) => this.assignBatchStandards(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting exams......')
    );
  }

  loadExam(examID: number): void {
    this.isLoading = true;
    this.examService.getExam(examID).subscribe (
      (response: any) => this.assignExam(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  loadSubjects(newObj: number): void {
    this.batchStandardService.getBatchStandardSubjects(newObj).subscribe (
      (response: any) => this.assignSubjects(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Subjects......')
    );
  }

  onChangeBatchStandard(newObj: number): void {
    this.exam.batch_standard_id = newObj;
    this.loadSubjects(newObj);
  }

  onChangeSubject(newObj: number): void {
    this.exam.subject_id = newObj;
    this.removeError("SubjectID")
  }

  back(): void {
    this.router.navigate(['/exams']);
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/exams/${response['exam']['id']}?success=true`;
      this.alertService.success("Exam Created Successful");
    } else {
      window.location.href = `/exams/${response['exam']['id']}?isUpdate=true`;
      this.alertService.success("Exam updated Successful");
    }
  }

  getError(error: any): void {
    
  }

  assignBatchStandards(response: any) {
    this.defaultBatchStandards = response;
  }
  
  assignSubjects(response: any) {
    this.subjects = response;
  }

  assignExam(response: any) {
    this.exam = response;
    if(!this.isNew) {
      this.exam.exam_date = new Date(this.exam.exam_date)
      this.loadSubjects(this.exam.batch_standard_id);
    }
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }

  onChangeExamType(newObj: any): void {
    this.exam.exam_type = newObj.toString();
  }

}
