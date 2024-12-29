import { Component, OnInit } from '@angular/core';
import { ExamService } from './../../service/exam.service';
import { LoginService } from './../../service/login.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { Exam } from './../../interface/exam';
import { ExamStudent } from './../../interface/exam-student';
import { BatchStandard } from './../../interface/batch-standard';
import { BatchStandardStudent } from './../../interface/batch-standard-student';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-group-result',
  templateUrl: './group-result.component.html',
  styleUrls: ['./group-result.component.css']
})
export class GroupResultComponent implements OnInit {

  public exams: Exam[] = [];
  public examStudents: ExamStudent[] = [];
  public selectedExam: number[] = [];
  public batchStandardStudents: BatchStandardStudent[] = [];
  public batchStandards: BatchStandard[] = [];
  public selectedBatchStandard: number;
  public showReport = false;

  constructor(private examService: ExamService, private loginService: LoginService, private alertService: AlertService,
    private batchStandardService: BatchStandardService){}

  ngOnInit(): void {
    this.loadDefaultBatchStandards();  
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

  loadDefaultBatchStandards(): void {
    this.batchStandardService.getDefaultBatchStandards().subscribe (
      (response: any) => this.assignBatchStandards(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting exams......')
    );
  }

  loadExams(batchStandardID: number): void {
    this.examService.getBatchStandardExams(batchStandardID).subscribe (
      (response: any) => this.assignExam(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting exams......')
    );
  }

  assignExam(response: any) {
    this.exams = response;
  }

  assignBatchStandards(response: any) {
    this.batchStandards = response;
  }

  onChangeBatchStandard(newObj: number): void {
    this.selectedBatchStandard = newObj;
    if(newObj != 0) {
      this.loadExams(newObj);
    } else {
      while(this.exams.length > 0) {
        this.exams.pop();
      }
      this.showReport=false;
    }
  }

  selectedExams(): Exam[] {
    return this.exams.filter(exam => exam.selected == true);
  }

  getReport(): void {
    if(this.selectedBatchStandard == undefined || this.selectedBatchStandard == 0) {
      this.showReport=false;
    } else {
      var selectedExam  = this.exams.filter(exam => exam.selected == true);
      var examStr = selectedExam.map(exam => exam.id).join(',');
      this.getBatchStandardStudents(this.selectedBatchStandard);
      this.getExamsReport(examStr);
      this.showReport=true;
    }
  }

  getBatchStandardStudents(batchStandardID: number): void {    
    this.batchStandardService.getBatchClassStudents(batchStandardID).subscribe (
      (response: any) => this.assignBatchStandardStudents(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting exams......')
    );
    
  }

  getExamsReport(examStr: string): void {
    this.examService.getExamsReport(examStr).subscribe (
      (response: any) => this.assignExamStudents(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting exams......')
    );    
  }

  assignExamStudents(response: any) {
    this.examStudents = response;
  }

  assignBatchStandardStudents(response: any): void {
    this.batchStandardStudents = response;
  }
}
