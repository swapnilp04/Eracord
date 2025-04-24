import { Component, OnInit, Input } from '@angular/core';
import { SubjectService } from './../../service/subject.service';
import { LoginService } from './../../service/login.service';
import { Subject } from './../../interface/subject';
import { AlertService } from '../../service/alert.service';
import { faFilePen, faBook, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  @Input() standardId: any;
  public subjects: Subject[] = [];
  faFilePen = faFilePen;
  faBook = faBook;
  faFolderOpen = faFolderOpen;
  
  constructor(private subjectService: SubjectService, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadStandards();
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

  loadStandards(): void {
    this.subjectService.getSubjects(this.standardId).subscribe (
      (response: any) => this.assignSubjects(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Subject......')
    );
  }

  assignSubjects(response: any) {
    this.subjects = response
  }
}
