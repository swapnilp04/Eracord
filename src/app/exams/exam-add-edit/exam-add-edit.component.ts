import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ExamService } from './../../service/exam.service';
import { LoginService } from './../../service/login.service';
import { Exam } from './../../interface/exam';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-exam-add-edit',
  templateUrl: './exam-add-edit.component.html',
  styleUrls: ['./exam-add-edit.component.css']
})
export class ExamAddEditComponent implements OnInit{
  public exam = {} as Exam;
  public isNew = true;
  public isLoading = false;
  
  
  constructor(private examService: ExamService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService) {}

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
    }
  }

  loadExam(examID: number): void {
    this.isLoading = true;
    this.examService.getExam(examID).subscribe (
      (response: any) => this.assignExam(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  back(): void {
    if(this.isNew) {
      this.router.navigate(['/exams']);
    }else {
      this.router.navigate(['/exams', this.exam.id]);
    }
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/exams/${response['exam']['id']}?success=true`;
    } else {
      window.location.href = `/exams/${response['exam']['id']}?isUpdate=true`;
    }
  }

  getError(error: any): void {
    
  }

  assignExam(response: any) {
    this.exam = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }

  onChangeExamType(newObj: any): void {
    this.exam.exam_type = newObj.toString();
  }

}