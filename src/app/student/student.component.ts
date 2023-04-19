import { Component, OnInit } from '@angular/core';
import {StudentService} from './../service/student.service';
import {Student} from './../interface/student';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent  implements OnInit {

  public student = {} as Student;
  public id: any;
  
  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location){}


  ngOnInit(): void {

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.loadStudent(id);
    });
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  }

   assignStudent(response: any) {
    this.student = response;
  }

  back(): void {
    this.location.back();
  }
}
