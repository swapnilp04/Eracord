import { Component, OnInit, Input } from '@angular/core';
import { Student } from './../../interface/student';
import { ExamStudent } from './../../interface/exam-student';
import { Subject } from './../../interface/subject';
import { BatchStandardStudent } from './../../interface/batch-standard-student';
import { StudentService } from './../../service/student.service';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPrint, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-exam-graph-reports',
  templateUrl: './student-exam-graph-reports.component.html',
  styleUrls: ['./student-exam-graph-reports.component.css']
})
export class StudentExamGraphReportsComponent implements OnInit {
  public studentId: any;
  public isLoading = true;
  public student = {} as Student;
  public examStudents: ExamStudent[] = [];
  public batchStandardStudents: BatchStandardStudent[] = [];
  public subjects: Subject[] = [];
  public selectedStatndard: number;
  public selectedSubjects: Subject[] = [];
  faPrint = faPrint;
  faChevronLeft = faChevronLeft;

  labels= [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ];

  data = [ 65, 59, 80, 81, 56, 55, 40 ];


  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location, 
    private router: Router, private loginService: LoginService, private alertService: AlertService, 
    private batchStandardService: BatchStandardService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.studentId = Number(param.get('student_id'));
      this.loadStudent(this.studentId);
      this.loadExamStudents(this.studentId);
      this.loadStudentBatchStandards(this.studentId);
    });
  }

  getStandardSubjects(): void {
    this.loadBatchStandardSubjects(this.selectedStatndard);
    while(this.selectedSubjects.length > 0) {
      this.selectedSubjects.pop();
    } 
  }

  onCheckChangeSubjects(value: any, subject: any):void {
    if(value.target.checked){
      subject.labels = this.labels;
      subject.data = this.data;
      this.selectedSubjects.push(subject);  
    } else {
      var index = this.selectedSubjects.indexOf(subject);
      if (index > -1) {
        this.selectedSubjects.splice(index, 1);
      }
    }
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  loadStudentBatchStandards(studentId: number): void {
    this.studentService.getStudentBatchStandards(studentId).subscribe (
      (response: any) => this.assignStudentBatchStandard(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoading = false
    );
  }

  loadBatchStandardSubjects(batchStandardId: number): void {
    this.batchStandardService.getBatchStandardSubjects(batchStandardId).subscribe (
      (response: any) => this.assignBatchStandardSubjects(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoading = false
    );
  }
  
  loadExamStudents(studentId: number): void {
    this.studentService.getStudentAllExams(studentId).subscribe (
      (response: any) => this.assignExamStudents(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoading = false
    );
  }

  assignStudent(response: any) {
    this.student = response;
    this.isLoading = false;
  }

  assignBatchStandardSubjects(response: any) {
    this.subjects = response;
  }

  assignStudentBatchStandard(response: any): void {
    this.batchStandardStudents = response;
  }

  assignExamStudents(response: any) {
    this.examStudents = response;
    this.isLoading = false;
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }

  back(): void {
    this.location.back();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }
}
