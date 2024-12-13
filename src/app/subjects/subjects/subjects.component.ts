import { Component, OnInit, Input } from '@angular/core';
import { SubjectService } from './../../service/subject.service';
import { LoginService } from './../../service/login.service';
import { Subject } from './../../interface/subject';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  @Input() standardId: any;
  public subjects: Subject[] = [];
  constructor(private subjectService: SubjectService, private loginService: LoginService){}

  ngOnInit(): void {
    this.loadStandards();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
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
