import { Component, OnInit, Input } from '@angular/core';
import { Student } from './../../interface/student';
import { ExamStudent } from './../../interface/exam-student';
import { ExamService } from './../../service/exam.service';
import { LoginService } from './../../service/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exam-students',
  templateUrl: './exam-students.component.html',
  styleUrls: ['./exam-students.component.css']
})
export class ExamStudentsComponent  implements OnInit {

  @Input() examId: any;
  public examStudents: ExamStudent[] = [];

  constructor(private examService: ExamService, private route: ActivatedRoute, private location: Location, 
    private router: Router, private loginService: LoginService){}

  ngOnInit(): void {
    this.loadExamStudents(this.examId);
  }

  loadExamStudents(examID: number): void {
    this.examService.getExamStudents(examID).subscribe (
      (response: any) => this.assignExamStudents(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Exam Students......')
    );
  }

  assignExamStudents(response: any) {
    this.examStudents = response;
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  changeExamPresentee(examStudent: ExamStudent):void {
    examStudent.is_present = !examStudent.is_present;
    examStudent.marks = 0;

  }

}
