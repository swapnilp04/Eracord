import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../service/transaction.service';
import { LoginService } from './../../service/login.service';
import { Transaction } from './../../interface/transaction';
import { Student } from './../../interface/student';
import { ReportForm } from './../../interface/report-form';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-transaction-reports',
  templateUrl: './transaction-reports.component.html',
  styleUrls: ['./transaction-reports.component.css']
})
export class TransactionReportsComponent {

  public transactions: Transaction[] = [];
  public reportForm = {report_type: 'Daily'} as ReportForm;
  public isLoading = false;

  constructor(private transactionService: TransactionService, private loginService: LoginService, 
    private alertService: AlertService){}

  onChangeReportType(newObj: string): void {
    this.reportForm.report_type = newObj;
  }

  getReport(): void {
    this.isLoading = true;
    let valid = this.checkValidation();
    if(!valid) {
      this.isLoading = false;
      return
    } else {
      this.fetchReport()
    }
  }

  fetchReport() {
    let paramString = this.getParamString()
    this.transactionService.getTransactionReport(paramString).subscribe (
      (response: any) => this.assignTransactions(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Transactions......')
    );
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  assignTransactions(response: any) {
    this.isLoading = false;
    this.transactions = response;
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

  checkValidation(): boolean {
    if(this.reportForm.report_type == "Daily" && this.reportForm.report_date == undefined) {
      this.alertService.error("Set report Date");
      return false;
    }

    if(this.reportForm.report_type == "Monthly") {
      if(this.reportForm.report_month == undefined) {
        this.alertService.error("Set report Month");
        return false;
      }
    }

    if(this.reportForm.report_type == "Custom") {
      if(this.reportForm.report_start == undefined || this.reportForm.report_end == undefined) {
        this.alertService.error("Set report Dates");
        return false;
      }
    }
    return true;
  }

  getParamString(): string {
    let paramString = "&type=" + this.reportForm.report_type;
    if(this.reportForm.report_type == "Daily") {
      paramString = paramString + "&report_date=" + this.getDateString(this.reportForm.report_date);
    }
    if(this.reportForm.report_type == "Monthly") {
      paramString = paramString + "&report_month=" + this.getDateString(this.reportForm.report_month);
    }
    if(this.reportForm.report_type == "Custom") {
      paramString = paramString + "&report_start=" + this.getDateString(this.reportForm.report_start);
      paramString = paramString + "&report_end=" + this.getDateString(this.reportForm.report_end);
    }
    return paramString;
  }

  getDateString(date: Date): string {
    var dateFormat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return dateFormat
  }
}
