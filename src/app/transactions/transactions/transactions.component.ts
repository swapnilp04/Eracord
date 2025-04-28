import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Transaction } from './../../interface/transaction';
import { Balance } from './../../interface/balance';
import { AlertService } from '../../service/alert.service';
import { faMoneyBill, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent  implements OnInit {

  @Input() studentId: any;
  @Input() showActions: any;
  public transactions: Transaction[] = [];
  public balance = {} as Balance;
  faMoneyBill = faMoneyBill;
  faMoneyBillTransfer = faMoneyBillTransfer;

  constructor(private studentService: StudentService, private loginService: LoginService, private alertService: AlertService){}


  ngOnInit(): void {
    this.loadTransactions();
    this.loadBalance(this.studentId);
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadTransactions(): void {
    this.studentService.getStudentTransactions(this.studentId).subscribe (
      (response: any) => this.assignTransactions(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standards......')
    );
  }

  loadBalance(studentID: number): void { 
    this.studentService.getStudentBalance(studentID).subscribe (
      (response: any) => this.assignStudentBalance(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  assignStudentBalance(response: any): void {
    this.balance = response;
  }

  assignTransactions(response: any) {
    this.transactions = response
  }

  isAccounthandle(): boolean { 
    return this.loginService.isAdminAccountant();
  }

  isAdmin(): boolean { 
    return this.loginService.isAdmin();
  }
}
