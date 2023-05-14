import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interface/student'
import { HostelStudent } from '../interface/hostel-student'
import { BatchStandard } from '../interface/batch-standard'
import { BatchStandardStudent } from '../interface/batch-standard-student'
import { Transaction } from '../interface/transaction'
import { Balance } from '../interface/balance'


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  URL = "http://localhost:8080"
  //URL = "http://54.237.98.76:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getStudents(page: number, search: string): Observable<Student[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Student[]>(`${this.loginService.URL}/students?page=${page}&search=${search}`, {headers: myHeaders});
  }

  getStudent(userID: number): Observable<Student> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Student>(`${this.loginService.URL}/students/${userID}`, {headers: myHeaders});
  }

  createStudent(student: Student): Observable<Student> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Student>(`${this.loginService.URL}/students`, student, {headers: myHeaders});
  }

  updateStudent(student: Student): Observable<Student> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<Student>(`${this.loginService.URL}/students/${student.id}`, student, {headers: myHeaders});
  }

  getStudentHostel(studentId: number): Observable<Student> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Student>(`${this.loginService.URL}/students/${studentId}/hostel`, {headers: myHeaders});
  }

  assignStudentHostel(userID: number, hostelId: number, hostelRoomID: number): Observable<HostelStudent>{
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<HostelStudent>(`${this.loginService.URL}/students/${userID}/assign_hostel`, 
      {hostel_id: hostelId, hostel_room_id: hostelRoomID}, {headers: myHeaders});
  }

  changeStudentHostel(userID: number, hostelId: number, hostelRoomID: number): Observable<HostelStudent>{
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<HostelStudent>(`${this.loginService.URL}/students/${userID}/change_hostel`, 
      {hostel_id: hostelId, hostel_room_id: hostelRoomID}, {headers: myHeaders});
  }

  getStudentBatchStandards(studentId: number): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<BatchStandard>(`${this.loginService.URL}/students/${studentId}/batch_standards`, {headers: myHeaders});
  }  

  getStudentBatchStandard(studentId: number, batchStandardId: number): Observable<BatchStandard> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<BatchStandard>(`${this.loginService.URL}/students/${studentId}/batch-standards/${batchStandardId}`, {headers: myHeaders});
  }

  assignStudentBatchStandard(studentId: number, batchStandardStudent: BatchStandardStudent): Observable<BatchStandardStudent>{
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<BatchStandardStudent>(`${this.loginService.URL}/students/${studentId}/batch_standards`, 
      batchStandardStudent, {headers: myHeaders});
  }

  getStudentTransactions(studentId: number): Observable<Transaction[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Transaction[]>(`${this.loginService.URL}/students/${studentId}/transactions`, {headers: myHeaders});
  }

  createStudentTransactions(studentId: number, transaction: Transaction): Observable<Transaction> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Transaction>(`${this.loginService.URL}/students/${studentId}/transactions`, transaction, {headers: myHeaders});
  }

  getStudentBalance(studentId: number): Observable<Balance> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Balance>(`${this.loginService.URL}/students/${studentId}/transactions/balance`, {headers: myHeaders});
  }
}
