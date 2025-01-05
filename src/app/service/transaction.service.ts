import { Injectable } from '@angular/core';
import { Transaction } from '../interface/transaction'
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getTransactions(page: number, search: string): Observable<Transaction[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Transaction[]>(`${this.loginService.URL}/accounts/transactions?page=${page}&search=${search}`, {headers: myHeaders});
  }

  getTransaction(studentId: number, transactionId: number): Observable<Transaction> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Transaction>(`${this.loginService.URL}/accounts/students/${studentId}/transactions/${transactionId}`, {headers: myHeaders});
  }

  getTransactionReport(paramString: string): Observable<Transaction[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Transaction[]>(`${this.loginService.URL}/accounts/transactions/report?${paramString}`, {headers: myHeaders});
  }
}
