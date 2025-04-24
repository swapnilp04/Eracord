import { Component, OnInit } from '@angular/core';
import { ChapterService } from './../../service/chapter.service';
import { LoginService } from './../../service/login.service';
import { Chapter } from './../../interface/chapter';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import {  faChevronLeft, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chapter-add-edit',
  templateUrl: './chapter-add-edit.component.html',
  styleUrls: ['./chapter-add-edit.component.css']
})
export class ChapterAddEditComponent implements OnInit {

  public chapter = {} as Chapter;
  public id: any;
  public standardId: any;
  public subjectId: any;
  public isNew = true;
  public isLoading = false;
  faChevronLeft = faChevronLeft;
  faCircleCheck = faCircleCheck;

  constructor(private chapterService: ChapterService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}

  createChapter(chapter: Chapter): void {
    this.isLoading = true;
    this.chapterService.createChapter(this.standardId, this.subjectId, chapter).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  updateChapter(chapter: Chapter): void {
    this.isLoading = true;
    this.chapterService.updateChapter(this.standardId, this.subjectId, chapter).subscribe (
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
      this.subjectId = Number(param.get('subject_id'));
      if(!this.isNew) {
        this.loadChapter(this.standardId, this.subjectId, id);
      }
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadChapter(standardId: number, subjectId: number, chapterId: number): void {
    this.isLoading = true;
    this.chapterService.getChapter(standardId, subjectId, chapterId).subscribe (
      (response: any) => this.assignChapter(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  back(): void {
    this.location.back();
  }

  getSuccess(response: any): void {
    this.router.navigate(['/standards', this.standardId, 'subjects', this.subjectId], { replaceUrl: true });
    this.alertService.success("Success");
  }
 
  isLoadingFalse(): void {
    this.isLoading = false;    
  }

  assignChapter(response: any) {
    this.chapter = response;
  }
}
