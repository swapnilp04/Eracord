import { Component, OnInit, Input } from '@angular/core';
import { ChapterService } from './../../service/chapter.service';
import { LoginService } from './../../service/login.service';
import { Chapter } from './../../interface/chapter';
import { AlertService } from '../../service/alert.service';
import { faFilePen, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {

   @Input() standardId: any;
   @Input() subjectId: any;
  public chapters: Chapter[] = [];
  faFilePen = faFilePen;
  faSquarePlus = faSquarePlus;

  constructor(private chapterService: ChapterService, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadChapters(this.standardId, this.subjectId);
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

  loadChapters(standardId: number, subjectId: number): void {
    this.chapterService.getChapters(standardId, subjectId).subscribe (
      (response: any) => this.assignChapters(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Chapter......')
    );
  }

  assignChapters(response: any) {
    this.chapters = response
  }

}


