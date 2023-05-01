import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from './../../service/student.service';
import { Transaction } from './../../interface/transaction';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent  implements OnInit {

  @Input() studentId: any;
  public transactions: Transaction[] = [];
  constructor(private studentService: StudentService){}


  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.studentService.getStudentTransactions(this.studentId).subscribe (
      (response: any) => this.assignTransactions(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Standards......')
    );
  }

  assignTransactions(response: any) {
    this.transactions = response
  }
}
