import { Component, OnInit, Input } from '@angular/core';
import { Student } from './../../interface/student';
import { ExamStudent } from './../../interface/exam-student';
import { ExamService } from './../../service/exam.service';
import { LoginService } from './../../service/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam-students',
  templateUrl: './exam-students.component.html',
  styleUrls: ['./exam-students.component.css']
})
export class ExamStudentsComponent  implements OnInit {

  @Input() examId: any;
  @Input() examStatus: any;
  @Input() marks: any;
  public isLoading = true;
  public examStudents: ExamStudent[] = [];
  faFloppyDisk = faFloppyDisk;

  constructor(private examService: ExamService, private route: ActivatedRoute, private location: Location, 
    private router: Router, private loginService: LoginService,
    private alertService: AlertService){}

  ngOnInit(): void {
    this.loadExamStudents(this.examId);
  }

  checkBoxEnables(examStudent: ExamStudent): boolean {
    return this.examStatus != "Conducted" || this.isLoading
  }

  markBoxEnables(examStudent: ExamStudent): boolean {
    return (!examStudent.is_present && this.examStatus == "Conducted") || this.isLoading
  }

  loadExamStudents(examID: number): void {
    this.examService.getExamStudents(examID).subscribe (
      (response: any) => this.assignExamStudents(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoading =false
    );
  }

  saveExamMarks(examId: any): void {
    this.isLoading = true
    this.examService.saveExamMarks(examId, this.examStudents).subscribe (
      (response: any) => this.savedExamMarks(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Exam Students......')
    );
  }

  assignExamStudents(response: any) {
    this.examStudents = response;
    if(this.examStatus == "Published") {
       this.examStudents = this.examStudents.sort((n2,n1) => (n1.marks || 0) - (n2.marks || 0));
    }
    this.isLoading =false;
  }

  savedExamMarks(response: any) {
    this.isLoading =false
    this.alertService.success("Exam Marks has been saved Successful");
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  changeExamPresentee(examStudent: ExamStudent):void {
    examStudent.is_present = !examStudent.is_present;
    examStudent.marks = 0;
  }
}