import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Batch } from './../interface/batch'


@Injectable({
  providedIn: 'root'
})
export class BatchService {

  URL = "http://localhost:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getBatchs(): Observable<Batch[]> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<Batch[]>(`${this.URL}/batchs`, {headers: myHeaders});
  }

  getBatch(batchID: number): Observable<Batch> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<Batch>(`${this.URL}/batchs/${batchID}`, {headers: myHeaders});
  }

  createBatch(batch: Batch): Observable<Batch> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.post<Batch>(`${this.URL}/batchs`, batch, {headers: myHeaders});
  }

  updateBatch(batch: Batch): Observable<Batch> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.put<Batch>(`${this.URL}/batchs/${batch.id}`, batch, {headers: myHeaders});
  }  
}
