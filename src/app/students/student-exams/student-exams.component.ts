import { Component, OnInit, Input } from '@angular/core';
import { Student } from './../../interface/student';
import { ExamStudent } from './../../interface/exam-student';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-exams',
  templateUrl: './student-exams.component.html',
  styleUrls: ['./student-exams.component.css']
})
export class StudentExamsComponent implements OnInit{

  @Input() studentId: any;
  @Input() studentName: any;
  public isLoading = true;
  public examStudents: ExamStudent[] = [];

  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location, 
    private router: Router, private loginService: LoginService){}

  ngOnInit(): void {
    this.loadExamStudents(this.studentId);
  }

  loadExamStudents(studentId: number): void {
    this.studentService.getStudentExams(studentId).subscribe (
      (response: any) => this.assignExamStudents(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoading =false
    );
  }

  assignExamStudents(response: any) {
    this.examStudents = response;
    this.isLoading =false;
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }
}
