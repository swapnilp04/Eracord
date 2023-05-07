import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../service/student.service';
import { BatchService } from './../../service/batch.service';
import { LoginService } from './../../service/login.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { Student } from './../../interface/student';
import { BatchStandardStudent } from './../../interface/batch-standard-student';
import { Batch } from './../../interface/batch';
import { BatchStandard } from './../../interface/batch-standard';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-batch-standard-student-add-edit',
  templateUrl: './batch-standard-student-add-edit.component.html',
  styleUrls: ['./batch-standard-student-add-edit.component.css']
})

export class BatchStandardStudentAddEditComponent implements OnInit {

  public student = {} as Student;
  public batchStandardStudent = {} as BatchStandardStudent;
  public batchs: Batch[] = [];
  public batchStandards: BatchStandard[] = [];
  public studentId: any;
  public isLoading = true;

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `Sutdent Created successfully. `
    }
  ];

  constructor(private studentService: StudentService, private batchService: BatchService, private batchStandardService: BatchStandardService,
    private route: ActivatedRoute, private location: Location, private router: Router, private loginService: LoginService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.studentId = Number(param.get('student_id'));
      this.batchStandardStudent.student_id = this.studentId;
      this.loadStudent(this.studentId);
    });
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  loadBatchs(): void {
    this.batchService.getBatchs().subscribe (
      (response: any) => this.assignBatchs(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  loadBatchStandards(batchId: number): void {
    this.batchStandardService.getBatchStandards(batchId).subscribe (
      (response: any) => this.assignBatchStandards(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    ); 
  }

  createBatchStandardStudent(): void {
    this.studentService.assignStudentBatchStandard(this.studentId, this.batchStandardStudent).subscribe (
      (response: any) => this.batchStandardStudentCreated(),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );   
  }

  assignStudent(response: any) {
    this.student = response;
    this.isLoading = false;
    this.loadBatchs();
  }

  assignBatchs(response: any): void {
    this.batchs = response;
  }

  assignBatchStandards(response: any): void {
    this.batchStandards = response;
  }

  back(): void {
    this.router.navigate(['/students', this.studentId]);
  }

  batchStandardStudentCreated(): void {
    this.router.navigate(['/students', this.studentId]);
  }

  onChangeBatch(newObj: number): void {
    while(this.batchStandards.length > 0) {
      this.batchStandards.pop();
    }
     this.batchStandardStudent.batch_id = newObj;
     this.loadBatchStandards(newObj);
  }

  selectBatchStandard(batchStandardId: any) {
    this.batchStandardStudent.batch_standard_id = batchStandardId;
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }
}
