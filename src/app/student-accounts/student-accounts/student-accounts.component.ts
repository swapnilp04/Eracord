import { Component, OnInit, Input } from '@angular/core';
import { StudentAccountsService } from './../../service/student-accounts.service';
import { LoginService } from './../../service/login.service';
import { StudentAccount } from './../../interface/student-account';
import { Student } from './../../interface/student';

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

  constructor(private studentAccountsService: StudentAccountsService, private loginService: LoginService){}

  ngOnInit(): void {
    this.loadStudentAccounts();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadStudentAccounts(): void {
    this.studentAccountsService.getStudentAccounts(this.studentId).subscribe (
      (response: any) => this.assignStudentAccounts(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Standards......')
    );
  }

  assignStudentAccounts(response: any) {
    this.studentAccounts = response;
  }
}
