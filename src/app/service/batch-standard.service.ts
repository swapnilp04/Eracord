import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BatchStandard } from './../interface/batch-standard'

@Injectable({
  providedIn: 'root'
})
export class BatchStandardService {
//URL = "http://localhost:8080"
URL = "http://54.237.98.76:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getBatchStandard(batchID: number, batchStandardId: number): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<BatchStandard>(`${this.URL}/batchs/${batchID}/batch-standards/${batchStandardId}`, {headers: myHeaders});
  }

  getBatchStandards(batchID: number): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<BatchStandard>(`${this.URL}/batchs/${batchID}/standards`, {headers: myHeaders});
  }

  createBatchStandard(batchId: any, batchStandard: BatchStandard): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<BatchStandard>(`${this.URL}/batchs/${batchId}/batch-standards`, batchStandard, {headers: myHeaders});
  }

  updateBatchStandard(batchId: any, batchStandard: BatchStandard): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<BatchStandard>(`${this.URL}/batchs/${batchId}/batch-standards/${batchStandard.id}`, batchStandard, {headers: myHeaders});
  }

  updateBatch(batchID: number, batchStandard: BatchStandard): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<BatchStandard>(`${this.URL}/batchs/${batchID}/batch-standards/${batchStandard.id}`, batchStandard, {headers: myHeaders});
  }  
  
}
