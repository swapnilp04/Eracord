import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../service/transaction.service';
import { LoginService } from './../../service/login.service';
import { Transaction } from './../../interface/transaction';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  public transaction = {} as Transaction;
  public id: any;
  public studentId: any;
  public classLoaded: boolean = false;
  
  public isLoading = true;


  constructor(private transactionService: TransactionService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));      
      this.studentId = Number(param.get('student_id'));      
      this.loadTransaction(this.studentId, this.id);
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadTransaction(studentID: number, transactionID: number): void {
    this.transactionService.getTransaction(studentID, transactionID).subscribe (
      (response: any) => this.assignTransaction(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Transactions......')
    );
  }

  assignTransaction(response: any) {
    this.transaction = response;
    this.isLoading = false;
    if(this.transaction.transaction_type == "debit") {
      this.router.navigate(['/transactions']);
    }
  }

  back(): void {
    this.location.back();
  }

  numberComma(amount: number): string {
    if(amount != undefined) {
      return amount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
      return ""
    }
  }

  name(): string {
    if(this.transaction.Student) {
      return `${this.transaction.Student.first_name} ${this.transaction.Student.middle_name} ${this.transaction.Student.last_name} `
    } 
    return ``
  }
}

