import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../service/transaction.service';
import { LoginService } from './../../service/login.service';
import { Transaction } from './../../interface/transaction';
import { Student } from './../../interface/student';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from '../../service/alert.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { faFileExport, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent  implements OnInit {

  public transactions: Transaction[] = [];
  currentPage = 1;
  page= 1;
  totalItems: number = 10;
  search = "";
  faFileExport = faFileExport;

  constructor(private transactionService: TransactionService, private loginService: LoginService, private alertService: AlertService,
    private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams
      //.filter(params => params.order)
      .subscribe(params => {
        this.page = params['page'] || 1;
        this.loadTransactions(this.page);
      }
    );
  }

  searchTable(): void{
   this.loadTransactions(this.page); 
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadTransactions(this.page); 
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

  pageChanged(event: PageChangedEvent): void {
    this.router.navigateByUrl(this.router.url.replace(this.page.toString(), event.page.toString()));
    this.page = event.page;
    while(this.transactions.length > 0) {
      this.transactions.pop();
    } 
    this.loadTransactions(this.page);
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
    if(error.status == 403) {
      this.alertService.error("Unauthorized");
    }
    if(error.status == 0) {
      this.loginService.toLogin();
    }
  }

  loadTransactions(pageNumber: number): void {
    this.transactionService.getTransactions(pageNumber, this.search).subscribe (
      (response: any) => this.assignTransactions(response),
      (error: any) => this.errorHandle(error),
      () => this.currentPage = parseInt(pageNumber.toString())
    );
  }

  assignTransactions(response: any) {
    this.transactions = response.transactions
    this.totalItems = response.total;
  }
}
