import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../interface/user'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = "http://localhost:8080"
  //URL = "http://54.237.98.76:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getUser(userId: number): Observable<User> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<User>(`${this.loginService.URL}/users/${userId}`, {headers: myHeaders});
  }

  getUsers(): Observable<User[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<User[]>(`${this.loginService.URL}/users`, {headers: myHeaders});
  }

  createUser(user: User): Observable<User> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<User>(`${this.loginService.URL}/users`, user, {headers: myHeaders});
  }

}
