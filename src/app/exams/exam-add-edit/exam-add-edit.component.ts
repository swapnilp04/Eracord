import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ExamService } from './../../service/exam.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { SubjectService } from './../../service/subject.service';
import { LoginService } from './../../service/login.service';
import { Exam } from './../../interface/exam';
import { BatchStandard } from './../../interface/batch-standard';
import { Subject } from './../../interface/subject';
import { Chapter } from './../../interface/chapter';
import { ExamChapter } from './../../interface/exam-chapter';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import {  faChevronLeft, faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { MultiSelectComponent } from './../../utilies/multi-select/multi-select.component';


@Component({
  selector: 'app-exam-add-edit',
  templateUrl: './exam-add-edit.component.html',
  styleUrls: ['./exam-add-edit.component.css']
})
export class ExamAddEditComponent implements OnInit{
  public exam = {} as Exam;
  public defaultBatchStandards: BatchStandard[] = [];
  public subjects: Subject[] = [];
  public chapters: Chapter[] = [];
  public selectedChapters: Chapter[] = [];
  public isNew = true;
  public isLoading = false;
  public formErr: any;
  faChevronLeft = faChevronLeft;
  faCircleCheck = faCircleCheck;

  onSelectionChange(selectedItems: any[]) {
    this.selectedChapters = selectedItems;
  }
  
  constructor(private examService: ExamService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private batchStandardService: BatchStandardService,
    private alertService: AlertService, private subjectService: SubjectService) {}

  createExam(exam: Exam): void {
    this.isLoading = true;
    this.exam.exam_chapters = [];
    //this.exam.exam_chapters.push(ExamChapter{exam_id: })
    this.selectedChapters.forEach((selectedChapter) => {
      //console.log(selectedChapter);
      let examChapter = {} as ExamChapter;
      if(this.exam.id != undefined){
        examChapter.exam_id = this.exam.id;
      }
      if(selectedChapter.id != undefined) {
      examChapter.chapter_id = selectedChapter.id;
      }
      this.exam.exam_chapters.push(examChapter);
    })
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
    this.batchStandardService.getActiveBatchStandards().subscribe (
      (response: any) => this.assignBatchStandards(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Batch Standards......')
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

  loadChapters(subjectId: number): void {
    this.subjectService.getChapters(subjectId).subscribe (
      (response: any) => this.assignChapters(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Chapters......')
    );
  }

  onChangeBatchStandard(newObj: number): void {
    this.exam.batch_standard_id = newObj;
    this.loadSubjects(newObj);
  }

  onChangeSubject(newObj: number): void {
    this.exam.subject_id = newObj;
    this.removeError("SubjectID")
    this.loadChapters(this.exam.subject_id);
  }

  back(): void {
    this.location.back();
  }

  getSuccess(response: any): void {
    this.router.navigate(['/exams', response['exam']['id']], { replaceUrl: true });
  }

  getError(error: any): void {
    
  }

  assignBatchStandards(response: any) {
    this.defaultBatchStandards = response;
    while(this.chapters.length > 0) {
      this.chapters.pop();
    }
    while(this.selectedChapters.length > 0) {
      this.selectedChapters.pop();
    }
  }
  
  assignSubjects(response: any) {
    this.subjects = response;
    while(this.chapters.length > 0) {
      this.chapters.pop();
    } 
    while(this.selectedChapters.length > 0) {
      this.selectedChapters.pop();
    }
  }

  assignChapters(response: any) {
    this.chapters = response;
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
