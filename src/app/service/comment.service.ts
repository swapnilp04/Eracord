import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './../interface/comment'
import { CommentCategory } from './../interface/comment-category'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getComments(): Observable<Comment[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Comment[]>(`${this.loginService.URL}/comments`, {headers: myHeaders});
  }

  getComment(commentID: number): Observable<Comment> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Comment>(`${this.loginService.URL}/comments/${commentID}`, {headers: myHeaders});
  }
}
