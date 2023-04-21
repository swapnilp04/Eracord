import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Standard } from './../interface/standard'


@Injectable({
  providedIn: 'root'
})
export class StandardService {
  URL = "http://localhost:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getStandards(): Observable<Standard[]> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<Standard[]>(`${this.URL}/standards`, {headers: myHeaders});
  }

  getStandard(standardID: number): Observable<Standard> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<Standard>(`${this.URL}/standards/${standardID}`, {headers: myHeaders});
  }

  createStandard(standard: Standard): Observable<Standard> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.post<Standard>(`${this.URL}/standards`, standard, {headers: myHeaders});
  }

  updateStandard(standard: Standard): Observable<Standard> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.put<Standard>(`${this.URL}/standards/${standard.id}`, standard, {headers: myHeaders});
  }  
}
