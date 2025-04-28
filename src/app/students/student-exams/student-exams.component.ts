import { Component, OnInit, Input } from '@angular/core';
import { Student } from './../../interface/student';
import { ExamStudent } from './../../interface/exam-student';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-exams',
  templateUrl: './student-exams.component.html',
  styleUrls: ['./student-exams.component.css']
})
export class StudentExamsComponent implements OnInit{

  @Input() studentId: any;
  @Input() studentName: any;
  currentPage = 1;
  page = 1;
  totalItems: number = 10;
  public isLoading = true;
  public examStudents: ExamStudent[] = [];
  faPrint = faPrint;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location, 
    private router: Router, private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadExamStudents(this.studentId, 1);
  }

  loadExamStudents(studentId: number, page: number): void {
    this.studentService.getStudentExams(studentId, page).subscribe (
      (response: any) => this.assignExamStudents(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoading =false
    );
  }

  pageChanged(event: PageChangedEvent): void {
    while(this.examStudents.length > 0) {
      this.examStudents.pop();
    }
    this.page = event.page;
    console.log(this.page)
    this.loadExamStudents(this.studentId, this.page);
  }

  showMarks(examStudent: any): boolean {
    return examStudent.is_present && examStudent.Exam.exam_status == "Published"
  }

  assignExamStudents(response: any) {
    this.examStudents = response.exams;
    this.totalItems = response.total;
    this.isLoading =false;
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }
}
