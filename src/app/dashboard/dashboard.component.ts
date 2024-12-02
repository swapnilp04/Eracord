import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from './../service/login.service';
import { HostelService } from './../service/hostel.service';
import { StudentService } from './../service/student.service';
import { CommentService } from './../service/comment.service';
import { HostelStudent } from './../interface/hostel-student';
import { HostelRoom } from './../interface/hostel-room';
import { Student } from './../interface/student';
import { Comment } from './../interface/comment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public hostelStudents: HostelStudent[] = [];
  public students: Student[] = [];
  public comments: Comment[] = [];

  constructor(private hostelService: HostelService, private studentService: StudentService, private commentService: CommentService,private loginService: LoginService){}

  ngOnInit(): void {
    this.loadHostelStudent()
    this.loadUpcommingBirdays()
    this.loadUpcommingComments()
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  loadHostelStudent(): void {
    this.hostelService.getHostelEarlyExpireStudents().subscribe (
      (response: any) => this.assignHostelStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostels......')
    );
  }

  assignHostelStudent(response: any) {
    this.hostelStudents = response;
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name} (${student.Standard.name})`
  }

  loadUpcommingBirdays(): void {
    this.studentService.getUpcommingBirthdays().subscribe (
      (response: any) => this.assignStudents(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostels......')
    );
  }

  loadUpcommingComments(): void {
    this.commentService.getUpcommingComments().subscribe (
      (response: any) => this.assignComments(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostels......')
    );
  }

  assignComments(response: any) {
    this.comments = response;
  }

  assignStudents(response: any) {
    this.students = response;
  }

}
