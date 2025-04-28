import { Component, OnInit, Input } from '@angular/core';
import { StudentAccountsService } from './../../service/student-accounts.service';
import { LoginService } from './../../service/login.service';
import { StudentAccount } from './../../interface/student-account';
import { Student } from './../../interface/student';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-student-accounts',
  templateUrl: './student-accounts.component.html',
  styleUrls: ['./student-accounts.component.css']
})

export class StudentAccountsComponent implements OnInit {
  
  @Input() studentId: any;
  @Input() student: Student;
  @Input() showActions: any;
  public studentAccounts: StudentAccount[] = [];
  currentPage = 1;
  page= 1;
  totalItems: number = 10;

  constructor(private studentAccountsService: StudentAccountsService, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadStudentAccounts(1);
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    while(this.studentAccounts.length > 0) {
      this.studentAccounts.pop();
    } 
    this.loadStudentAccounts(this.page);
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadStudentAccounts(this.page);  
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadStudentAccounts(pageNumber: number): void {
    this.studentAccountsService.getStudentAccounts(this.studentId, pageNumber).subscribe (
      (response: any) => this.assignStudentAccounts(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standards......')
    );
  }

  assignStudentAccounts(response: any) {
    this.studentAccounts = response.studentAccounts;
    this.totalItems = response.total;
  }

  isAccounthandle(): boolean { 
    return this.loginService.isAdminAccountant();
  }
}
