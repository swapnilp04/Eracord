import { Component, OnInit, Input } from '@angular/core';
import { Student } from './../../interface/student';
import { ExamStudent } from './../../interface/exam-student';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPrint, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-student-exams-report',
  templateUrl: './student-exams-report.component.html',
  styleUrls: ['./student-exams-report.component.css']
})
export class StudentExamsReportComponent  implements OnInit {
  
  public studentId: any;
  isLoading = true;
  public student = {} as Student;
  public examStudents: ExamStudent[] = [];
  faPrint = faPrint;
  faChevronLeft = faChevronLeft;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location, 
    private router: Router, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.studentId = Number(param.get('student_id'));
      this.loadStudent(this.studentId);
      
    });
  }

  loadStudent(studentID: number): void {
    this.isLoading = true;
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  loadExamStudents(studentId: number): void {
    this.isLoading = true;
    this.studentService.getStudentAllExams(studentId).subscribe (
      (response: any) => this.assignExamStudents(response),
      (error: any) => this.errorHandle(error),
      () => this.disableLoading()
    );
  }

  disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  assignStudent(response: any) {
    this.student = response;
    this.loadExamStudents(this.studentId);
    this.isLoading = false;
  }

  assignExamStudents(response: any) {
    this.examStudents = response;
    this.isLoading =false;
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }

  back(): void {
    this.location.back();
    //this.router.navigate(['/students']);
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
    this.isLoading = false;
  }
}
