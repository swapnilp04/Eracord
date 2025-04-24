import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapter } from './../interface/chapter'

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getChapters(standardId: number, subjectId: number): Observable<Chapter[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Chapter[]>(`${this.loginService.URL}/standards/${standardId}/subjects/${subjectId}/chapters`, {headers: myHeaders});
  }

  getChapter(standardId: number, subjectID: number, chapterID: number): Observable<Chapter> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Chapter>(`${this.loginService.URL}/standards/${standardId}/subjects/${subjectID}/chapters/${chapterID}`, {headers: myHeaders});
  }

  createChapter(standardId: number, subjectId: number, chapter: Chapter): Observable<Chapter> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Chapter>(`${this.loginService.URL}/standards/${standardId}/subjects/${subjectId}/chapters`, chapter, {headers: myHeaders});
  }

  updateChapter(standardId: number, subjectId: number, chapter: Chapter): Observable<Chapter> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<Chapter>(`${this.loginService.URL}/standards/${standardId}/subjects/${subjectId}/chapters/${chapter.id}`, chapter, {headers: myHeaders});
  }  
}
