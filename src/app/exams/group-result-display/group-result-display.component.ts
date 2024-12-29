import { Component, OnInit, Input } from '@angular/core';
import { Exam } from './../../interface/exam';
import { ExamStudent } from './../../interface/exam-student';
import { BatchStandard } from './../../interface/batch-standard';
import { BatchStandardStudent } from './../../interface/batch-standard-student';

@Component({
  selector: 'app-group-result-display',
  templateUrl: './group-result-display.component.html',
  styleUrls: ['./group-result-display.component.css']
})
export class GroupResultDisplayComponent implements OnInit{
  @Input() batchStudents: BatchStandardStudent[];
  @Input() exams: Exam[];
  @Input() examsStudents: ExamStudent[];


  ngOnInit(): void {
  }

  getExam(studentId: number, examId: any): any {
    var examStudent = this.examsStudents.filter((value) => value.student_id == studentId && value.exam_id == examId)[0]
    if(examStudent == undefined) {
      return "--"
    } else {
      return examStudent.is_present ? examStudent.marks : 'A'
     }
  }

  getTotalMarks(studentId: number): number {
    let total = 0;
    var examStudents = this.examsStudents.filter((value) => value.student_id == studentId)
    for(let i = 0; i < examStudents.length; i++) { 
      total = total + examStudents[i].marks;
    }
    return total;
  }

  getTotalExamsMarks(): number {
    let total = 0;
    for(let i = 0; i < this.exams.length; i++) { 
      total = total + this.exams[i].exam_marks;
    }
    return total;
  }

  saveTotalStudentsMarks(): void {
    for(let i = 0; i < this.batchStudents.length; i++) { 
      let marks = this.getTotalMarks(this.batchStudents[i].student_id);
      this.batchStudents[i].totalMarks = marks;
    }

    this.batchStudents = this.batchStudents.sort((n2,n1) => (n1.totalMarks || 0) - (n2.totalMarks || 0));
  }
}
