import { Component, OnInit } from '@angular/core';
import { CommentService } from './../../service/comment.service';
import { LoginService } from './../../service/login.service';
import { Comment } from './../../interface/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{

  public comments: Comment[] = [];

  constructor(private commentService: CommentService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadComments();    
  }

  loadComments(): void {
    this.commentService.getComments().subscribe (
      (response: any) => this.assignComments(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Comments......')
    );
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
    if(error.status == 0) {
      this.loginService.toLogin();
    }
  }

  assignComments(response: any) {
    this.comments = response
  }

}
