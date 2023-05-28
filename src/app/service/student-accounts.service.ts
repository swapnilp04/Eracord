import { Injectable } from '@angular/core';
import { StudentAccount } from '../interface/student-account'
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentAccountsService {
  constructor(private http: HttpClient, private loginService: LoginService) { }

  getStudentAccounts(studentId: number): Observable<StudentAccount[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<StudentAccount[]>(`${this.loginService.URL}/students/${studentId}/student_accounts`, {headers: myHeaders});
  }

  createDeposit(studentId: number, studentAccount: StudentAccount): Observable<StudentAccount> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<StudentAccount>(`${this.loginService.URL}/students/${studentId}/student_accounts/deposit`, studentAccount, {headers: myHeaders});
  }

  createWithdraw(studentId: number, studentAccount: StudentAccount): Observable<StudentAccount> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<StudentAccount>(`${this.loginService.URL}/students/${studentId}/student_accounts/withdraw`, studentAccount, {headers: myHeaders});
  }
}