import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Student } from './../../interface/student';
import { BatchStandardStudent } from './../../interface/batch-standard-student';
import { HostelStudent } from './../../interface/hostel-student';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { AlertService } from '../../service/alert.service';
import { faBed, faUserPen, faFolderOpen, faMoneyBill, faChevronLeft, faComment , faPersonWalkingArrowRight, faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent  implements OnInit {

  public student = {} as Student;
  public hostelStudent = {} as HostelStudent;
  public batchStandardStudents: BatchStandardStudent[] = [];
  public id: any;
  public studentId: any;
  public classLoaded: boolean = false;
  public isLoading = true;
  faUserPen = faUserPen;
  faChevronLeft = faChevronLeft;
  faComment = faComment;
  faPersonWalkingArrowRight = faPersonWalkingArrowRight;
  faEnvelopeOpenText = faEnvelopeOpenText;

  value?: string;
  public hasHostel: boolean = false;
  
  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}


  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));      
      this.loadStudent(this.id);
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  onSelect(data: TabDirective): void {
    this.value = data.heading;
    if(this.value == 'Class' && !this.classLoaded)  {
      this.classLoaded = true;
      this.loadStudentBatchStandards(this.id);
    }
  }

  loadStudentBatchStandards(studentID: number): void {
    this.studentService.getStudentBatchStandards(studentID).subscribe (
      (response: any) => this.assignStudentBatchStandard(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  loadStudent(studentID: number): void {
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Student......')
    );
  }

  loadStudentHostel(studentID: any): void {
    this.studentService.getStudentHostel(studentID).subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Hostel......')
    );
  }

  leftAcademy(studentID: any): void {
    if(confirm("Are you sure to leave student from academy?")) {
      this.studentService.leftAcademy(studentID).subscribe (
        (response: any) => this.leftAcademySuccess(response),
        (error: any) => this.errorHandle(error),
        () => console.log('Done getting Student......')
      );
    }
  }

  leftAcademySuccess(response: any): void {
    window.location.reload();
    this.alertService.success("Student Left Successful");
  }

  assignStudent(response: any) {
    this.student = response;
    this.isLoading = false;
    if(!this.student.has_absconded) {
      this.loadStudentHostel(this.student['id']);
    }
  }

  assignHostel(response: any): void {
    this.hasHostel = true;
    this.hostelStudent = response;
  }

  assignStudentBatchStandard(response: any): void {
    this.batchStandardStudents = response;
  }

  isLeft(): boolean {
    return this.student.has_left
  }

  back(): void {
    this.location.back();
    //this.router.navigate(['/students']);
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }

  adharCard(): string {
    return `${this.student.adhar_card.slice(0,4)} - ${this.student.adhar_card.slice(4,8)} - ${this.student.adhar_card.slice(8,12)}`
  }
}
