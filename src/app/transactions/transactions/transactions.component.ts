import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from './../../service/student.service';
import { Transaction } from './../../interface/transaction';
import { Balance } from './../../interface/balance';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent  implements OnInit {

  @Input() studentId: any;
  public transactions: Transaction[] = [];
  public balance = {} as Balance;

  constructor(private studentService: StudentService){}


  ngOnInit(): void {
    this.loadTransactions();
    this.loadBalance(this.studentId);
  }

  loadTransactions(): void {
    this.studentService.getStudentTransactions(this.studentId).subscribe (
      (response: any) => this.assignTransactions(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Standards......')
    );
  }

  loadBalance(studentID: number): void { 
    this.studentService.getStudentBalance(studentID).subscribe (
      (response: any) => this.assignStudentBalance(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  }

  assignStudentBalance(response: any): void {
    this.balance = response;
  }

  assignTransactions(response: any) {
    this.transactions = response
  }
}
