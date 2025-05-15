import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent } from '../interface/parent'


@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getParents(page: number, search: string): Observable<Parent[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Parent[]>(`${this.loginService.URL}/parents?page=${page}&search=${search}`, {headers: myHeaders});
  }

  getParent(parentID: number): Observable<Parent> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Parent>(`${this.loginService.URL}/parents/${parentID}`, {headers: myHeaders});
  }

  createParent(parent: Parent): Observable<Parent> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Parent>(`${this.loginService.URL}/parents`, parent, {headers: myHeaders});
  }

  updateParent(parent: Parent): Observable<Parent> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<Parent>(`${this.loginService.URL}/parents/${parent.id}`, parent, {headers: myHeaders});
  }
}
