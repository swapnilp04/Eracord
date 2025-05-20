import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent } from '../interface/parent'
import { Student } from '../interface/student'
import { ParentStudent } from '../interface/parent-student'


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

  allocateStudentToParent(parent: Parent, studentId: number): Observable<ParentStudent> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<ParentStudent>(`${this.loginService.URL}/parents/${parent.id}/students/${studentId}/assign`, {}, {headers: myHeaders});
  }

  getParentStudents(parentId: number): Observable<ParentStudent> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<ParentStudent>(`${this.loginService.URL}/parents/${parentId}/parent-students`, {headers: myHeaders});
  }

  deleteParentStudents(parentId: number, parentStudentID: number): Observable<{}> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.delete<{}>(`${this.loginService.URL}/parents/${parentId}/parent-students/${parentStudentID}`, {headers: myHeaders});
  }
}
