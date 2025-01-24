import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BatchStandard } from './../interface/batch-standard'
import { Subject } from './../interface/subject'
import { BatchStandardStudent } from './../interface/batch-standard-student'

@Injectable({
  providedIn: 'root'
})
export class BatchStandardService {
URL = "http://localhost:8080"
//URL = "http://54.237.98.76:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getBatchStandard(batchID: number, batchStandardId: number): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<BatchStandard>(`${this.loginService.URL}/batchs/${batchID}/batch-standards/${batchStandardId}`, {headers: myHeaders});
  }

  getBatchStandards(batchID: number): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<BatchStandard>(`${this.loginService.URL}/batchs/${batchID}/standards`, {headers: myHeaders});
  }

  getDefaultBatchStandards(): Observable<BatchStandard[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<BatchStandard[]>(`${this.loginService.URL}/batchs/get_default_batch_standards`, {headers: myHeaders});
  }

  getBatchStandardStudents(batchID: number, batchStandardId: number): Observable<BatchStandardStudent>{
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<BatchStandardStudent>(`${this.loginService.URL}/batchs/${batchID}/batch-standards/${batchStandardId}/students`, {headers: myHeaders});
  }

  getBatchClassStudents(batchStandardId: number): Observable<BatchStandardStudent>{
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<BatchStandardStudent>(`${this.loginService.URL}/batch-standards/${batchStandardId}/students`, {headers: myHeaders});
  }

  createBatchStandard(batchId: any, batchStandard: BatchStandard): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<BatchStandard>(`${this.loginService.URL}/batchs/${batchId}/batch-standards`, batchStandard, {headers: myHeaders});
  }

  updateBatchStandard(batchId: any, batchStandard: BatchStandard): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<BatchStandard>(`${this.loginService.URL}/batchs/${batchId}/batch-standards/${batchStandard.id}`, batchStandard, {headers: myHeaders});
  }

  updateBatch(batchID: number, batchStandard: BatchStandard): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<BatchStandard>(`${this.loginService.URL}/batchs/${batchID}/batch-standards/${batchStandard.id}`, batchStandard, {headers: myHeaders});
  }  

  getBatchStandardSubjects(batchStandardId: number): Observable<Subject[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Subject[]>(`${this.loginService.URL}/batch-standards/${batchStandardId}/subjects`, {headers: myHeaders});
  }

  deleteBatchStandardStudent(batchStandardId: number, batchStandardStudentID: number): Observable<BatchStandardStudent>{
    const myHeaders = this.loginService.getHeaders();
    return this.http.delete<BatchStandardStudent>(`${this.loginService.URL}/batch-standards/${batchStandardId}/batch-standard-students/${batchStandardStudentID}`, {headers: myHeaders});
  }
  
}
