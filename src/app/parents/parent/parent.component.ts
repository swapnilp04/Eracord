import { Component, OnInit } from '@angular/core';
import { ParentService } from './../../service/parent.service';
import { LoginService } from './../../service/login.service';
import { Parent } from './../../interface/parent';
import { Student } from './../../interface/student';
import { ParentStudent } from './../../interface/parent-student';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { faChevronLeft, faUserPen, faHandsHoldingChild, faBed, faTrashCan } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  public parent = {} as Parent;
  public id: any;
  public isLoading = true;
  faChevronLeft = faChevronLeft;
  faUserPen = faUserPen;
  faHandsHoldingChild = faHandsHoldingChild;
  faBed = faBed;
  faTrashCan = faTrashCan;
  public parentStudents: ParentStudent[] = [];

  constructor(private parentService: ParentService, private route: ActivatedRoute, private location: Location, private router: Router,
   private loginService: LoginService, private alertService: AlertService){}

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
    if(response['id'] != undefined) {
      this.getParentStudents(response['id']);  
    }
  }

  back(): void {
    this.location.back();
  }

  isEdit(): boolean { 
    return this.loginService.isAdminAccountant();
  }

  getParentStudents(parentID: number): void {
    this.parentService.getParentStudents(parentID).subscribe (
      (response: any) => this.assignParentStudents(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Parent......')
    );
  }

  assignParentStudents(response: any): void {
    this.parentStudents = response;
    console.log(this.parentStudents);
    this.isLoading = false;
  }

  name(student: Student): string {
    return `${student.first_name} ${student.middle_name} ${student.last_name}`
  }

  removeParentStudent(parentId: any, parentStudentId: any): void {
    if(confirm("Are you sure to Remove student from Parent?")) {
      this.parentService.deleteParentStudents(parentId, parentStudentId).subscribe (
        (response: any) => this.removeParentStudentSuccess(response),
        (error: any) => this.errorHandle(error),
        () => console.log('Done Deleting Parent Student......')
      );
    }
  }

  removeParentStudentSuccess(response: any) {
    this.parentStudents = this.parentStudents.filter((value) => value.id != response['id']);
  }

}
