import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Batch } from './../interface/batch'
import { Standard } from './../interface/standard'


@Injectable({
  providedIn: 'root'
})
export class BatchService {

  URL = "http://localhost:8080"
  //URL = "http://54.237.98.76:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getBatchs(): Observable<Batch[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Batch[]>(`${this.loginService.URL}/batchs`, {headers: myHeaders});
  }

  getBatch(batchID: number): Observable<Batch> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Batch>(`${this.loginService.URL}/batchs/${batchID}`, {headers: myHeaders});
  }

  createBatch(batch: Batch): Observable<Batch> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Batch>(`${this.loginService.URL}/batchs`, batch, {headers: myHeaders});
  }

  updateBatch(batch: Batch): Observable<Batch> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<Batch>(`${this.loginService.URL}/batchs/${batch.id}`, batch, {headers: myHeaders});
  }  

  getStandards(batchID: number): Observable<Standard[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Standard[]>(`${this.loginService.URL}/batchs/${batchID}/unassigned_standards`, {headers: myHeaders});
  }
}
