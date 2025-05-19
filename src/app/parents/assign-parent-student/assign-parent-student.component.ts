import { Component, OnInit } from '@angular/core';
import { ParentService } from './../../service/parent.service';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../service/login.service';
import { Parent } from './../../interface/parent';
import { Student } from './../../interface/student';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft, faUserPen, faHandsHoldingChild, faBed } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-assign-parent-student',
  templateUrl: './assign-parent-student.component.html',
  styleUrls: ['./assign-parent-student.component.css']
})
export class AssignParentStudentComponent {

  public parent = {} as Parent;
  public students: Student[] = [];
  public id: any;
  public isLoading = true;
  faChevronLeft = faChevronLeft;
  faUserPen = faUserPen;
  faHandsHoldingChild = faHandsHoldingChild;
  faBed = faBed;
  search = "";
  public selectedStudent: number;

  constructor(private parentService: ParentService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService, private studentService: StudentService){}

  ngOnInit(): void {    
    this.route.queryParams.subscribe((param) => {
      this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      
      this.loadParent(id);
      });
    });
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  loadParent(parentID: number): void {
    this.parentService.getParent(parentID).subscribe (
      (response: any) => this.assignParent(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Parent......')
    );
  }
 
  assignParent(response: any) {
    this.parent = response;
    this.isLoading = false;
  }

  back(): void {
    this.location.back();
  }

  isEdit(): boolean { 
    return this.loginService.isAdminAccountant();
  }

  changed(e: any) {
    this.searchStudent(); 
  }

  searchStudent(): void {
    if(this.search.length > 3) {
      this.studentService.searchStudents(this.search).subscribe (
        (response: any) => this.assignStudents(response),
        (error: any) => this.errorHandle(error),
        () => console.log('Done getting Students......')
      );
    } else {
      this.alertService.error("Please Seach More than 3 words");
    }
  }

  assignStudents(response: any) {
    this.students = response;
    this.isLoading = false;
    if(this.students.length == 0) {
      this.alertService.error("No Students Found");
    } else {
      this.alertService.clear();
    }
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

  selectStudent(student: Student): void {
    if(student.id != undefined) {
      this.selectedStudent = student.id;
    }
  }

  assignStudentToParent(): void {
    if(confirm("Are you sure to Allocate selected student to Parent?")) {
      this.parentService.allocateStudentToParent(this.parent, this.selectedStudent).subscribe (
        (response: any) => this.allocateStudentSuccess(response),
        (error: any) => this.errorHandle(error),
        () => console.log('Done getting Alocate Student......')
      );
    }
  }

  allocateStudentSuccess(response: any): void {
    this.router.navigate(['/parents', this.parent.id], { replaceUrl: true });
  }
}
