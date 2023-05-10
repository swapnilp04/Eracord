import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user'
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //URL = "http://localhost:8080"
  URL = "http://54.237.98.76:8080"
  public isLogin = false;

  constructor(private cookies: CookieService, private http: HttpClient, private router: Router) { }

  loginUser(user: User): Observable<User> {
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
    });
    return this.http.post<User>(`${this.URL}/login`, user, {headers: myHeaders});
  }

  getToken() {
    return this.cookies.get('token');
  }

  getUrl() {
    return "http://localhost:8080"
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  getHeaders(): any {
    const token = this.getToken();
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });

  }
}
