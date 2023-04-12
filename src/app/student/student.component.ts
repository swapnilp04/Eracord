import { Component, OnInit } from '@angular/core';
import {StudentService} from './../service/student.service';
import {Student} from './../interface/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent  implements OnInit {

  public students: Student[] = [];
  constructor(private studentService: StudentService){}
  

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe (
      (response: any) => this.assignStudents(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Students......')
    );
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  }

  createStudent(student: Student): void {
    this.studentService.createStudent(student).subscribe (
      (response: any) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  }

    assignStudents(response: any) {
      this.students = response
    }
}
