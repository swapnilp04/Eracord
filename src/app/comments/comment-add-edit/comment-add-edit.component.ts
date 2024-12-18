import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommentService } from './../../service/comment.service';
import { StudentService } from './../../service/student.service';
import { CommentCategoryService } from './../../service/comment-category.service';
import { LoginService } from './../../service/login.service';
import { Comment } from './../../interface/comment';
import { Student } from './../../interface/student';
import { CommentCategory } from './../../interface/comment-category';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-comment-add-edit',
  templateUrl: './comment-add-edit.component.html',
  styleUrls: ['./comment-add-edit.component.css']
})

export class CommentAddEditComponent {
  public student = {} as Student;
  public id: any;
  public comment = {} as Comment;
  public commentCategories: CommentCategory[] = [];
  public isNew = true;
  public isLoading = false;

  constructor(private commentService: CommentService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private commentCategoryService: CommentCategoryService, private studentService: StudentService,
    private alertService: AlertService){}

  ngOnInit(): void {
    this.loadCommentCategory()

    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    }

    this.route.paramMap.subscribe((param) => {
      var studentId = Number(param.get('student_id'));
      this.loadStudent(studentId);
      if(!this.isNew) {
        var id = Number(param.get('id'));
        this.loadComment(id);
      }
    });
  }

  createComment(comment: Comment): void {
    this.isLoading = true;
    if(this.student.id) {
      this.commentService.createComment(this.student.id, comment).subscribe (
        (response: any) => this.getSuccess(response),
        (error: any) => this.errorHandle(error),
        () => this.isLoadingFalse()
      );
    }
  }

  updateComment(comment: Comment): void {
    this.isLoading = true;
    this.commentService.updateComment(comment).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  loadStudent(studentID: number): void {
    this.isLoading = true;
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  assignStudent(response: any) {
    this.student = response;
  }

  onChangeCommentCategory(newObj: number): void {
    this.comment.comment_category_id = newObj;
  }

  loadComment(commentId: number): void {
    this.isLoading = true;
    this.commentService.getComment(commentId).subscribe (
      (response: any) => this.assignComment(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  loadCommentCategory(): void {
    this.commentCategoryService.getCommentsCategories().subscribe (
      (response: any) => this.assignCommentCategories(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
     this.alertService.error("Unauthorized");
      window.scroll({ 
           top: 0, 
           left: 0, 
           behavior: 'smooth' 
      });
    }
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      this.router.navigate([`/students/${this.student.id}`]);
      this.alertService.success("Comment Created Successful");
    } else {
      window.location.href = `/comments/${response['comment']['id']}?isUpdate=true`;
      this.alertService.success("Comment updated Successful");
    }
  }

  back(): void {
    if(this.isNew) {
      this.router.navigate([`/students/${this.student.id}`]);
    }else {
      this.router.navigate(['/comments', this.comment.id]);
    }
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }

  assignComment(response: any) {
    this.comment = response;
  }

  assignCommentCategories(response: any) {
    this.commentCategories = response;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }
}
