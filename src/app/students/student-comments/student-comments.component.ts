import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from './../../service/comment.service';
import { LoginService } from './../../service/login.service';
import { Comment } from './../../interface/comment';
import { Student } from './../../interface/student';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-student-comments',
  templateUrl: './student-comments.component.html',
  styleUrls: ['./student-comments.component.css']
})
export class StudentCommentsComponent implements OnInit {

  @Input() studentId: any;
  @Input() student: Student;
  public comments: Comment[] = [];
  currentPage = 1;
  page= 1;
  totalItems: number = 10;

  constructor(private commentService: CommentService, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadStudentComments(1);
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    while(this.comments.length > 0) {
      this.comments.pop();
    } 
    this.loadStudentComments(this.page);
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadStudentComments(this.page);  
  }

  loadStudentComments(pageNumber: number): void {
    this.commentService.getStudentComments(this.studentId, pageNumber).subscribe (
      (response: any) => this.assignStudentComments(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standards......')
    );
  }

  completeComment(comment: Comment): void {
    if(confirm("Are you sure to complete this comment")) {
      this.commentService.commentCompleted(comment).subscribe (
        (response: any) => comment.completed = true,
        (error: any) => this.errorHandle(error),
        () => comment.is_loading = false
      );
    }
  }

  assignStudentComments(response: any) {
    this.comments = response.comments;
    this.totalItems = response.total;
  }
}

