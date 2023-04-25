import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {StudentService} from './../../service/student.service';
import {Student} from './../../interface/student';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {

  public student = {} as Student;
  public isNew = true;
  
  constructor(private studentService: StudentService, private location: Location, private router: Router, private route: ActivatedRoute){}


  createStudent(student: Student): void {
    this.studentService.createStudent(student).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  }

  updateStudent(student: Student): void {
    this.studentService.updateStudent(student).subscribe (
      (response: any) => this.getSuccess(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  }

  ngOnInit(): void {
    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    }

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      if(!this.isNew) {
        this.loadStudent(id);
      }
    });
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  }

  back(): void {
    if(this.isNew) {
      this.router.navigate(['/students']);
    } else {
      this.router.navigate(['/students', this.student.id]);
    }
  }

  getSuccess(response: any): void {
    if(this.isNew) {
      window.location.href = `/students/${response['student']['id']}?success=true`;
    } else {
      window.location.href = `/students/${response['student']['id']}?isUpdate=true`;
    }
  }

  getError(error: any): void {
    
  }

  assignStudent(response: any) {
    this.student = response;
  }
}
