import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentCategory } from './../interface/comment-category'


@Injectable({
  providedIn: 'root'
})
export class CommentCategoryService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getCommentsCategories(): Observable<CommentCategory[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<CommentCategory[]>(`${this.loginService.URL}/comment_categories`, {headers: myHeaders});
  }
}

