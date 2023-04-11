import { Component } from '@angular/core';
import {StudentService} from './../service/student.service';
import {Student} from './../interface/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent {

  constructor(private studentService: StudentService){}

  loadStudents(): void {
    this.studentService.getStudents().subscribe (
      (response: any) => console.log(response),
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


}
