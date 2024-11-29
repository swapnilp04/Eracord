import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from './../../service/comment.service';
import { LoginService } from './../../service/login.service';
import { Comment } from './../../interface/comment';
import { Student } from './../../interface/student';


@Component({
  selector: 'app-student-comments',
  templateUrl: './student-comments.component.html',
  styleUrls: ['./student-comments.component.css']
})
export class StudentCommentsComponent implements OnInit {

  @Input() studentId: any;
  @Input() student: Student;
  public comments: Comment[] = [];

  constructor(private commentService: CommentService, private loginService: LoginService){}

  ngOnInit(): void {
    this.loadStudentComments();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadStudentComments(): void {
    this.commentService.getStudentComments(this.studentId).subscribe (
      (response: any) => this.assignStudentComments(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standards......')
    );
  }

  assignStudentComments(response: any) {
    this.comments = response;
  }

}
