import { Component, OnInit } from '@angular/core';
import { CommentService } from './../../service/comment.service';
import { LoginService } from './../../service/login.service';
import { Comment } from './../../interface/comment';
import { Student } from './../../interface/student';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public comments: Comment[] = [];
  currentPage = 1;
  page= 1;
  totalItems: number = 10;
  search = "";

  constructor(private commentService: CommentService, private loginService: LoginService){}

  ngOnInit(): void {
    this.loadComments(this.page);
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    while(this.comments.length > 0) {
      this.comments.pop();
    } 
    this.loadComments(this.page);
  }

  searchTable(): void{
   this.loadComments(this.page); 
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadComments(this.page);  
  }

  loadComments(pageNumber: number): void {
    this.commentService.getComments(pageNumber, this.search).subscribe (
      (response: any) => this.assignComments(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standards......')
    );
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

  assignComments(response: any) {
    this.comments = response.comments;
    this.totalItems = response.total;
  }
}
