import { Component, OnInit, Input } from '@angular/core';
import { BatchStandardService } from './../../service/batch-standard.service';
import { LoginService } from './../../service/login.service';
import { BatchStandardStudent } from './../../interface/batch-standard-student';
import { Student } from './../../interface/student';
import { AlertService } from '../../service/alert.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { faUsersViewfinder, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-batch-standard-students',
  templateUrl: './batch-standard-students.component.html',
  styleUrls: ['./batch-standard-students.component.css']
})
export class BatchStandardStudentsComponent implements OnInit {

  @Input() batchStandardStudents: BatchStandardStudent[];
  @Input() student: Student;
  faUsersViewfinder = faUsersViewfinder;
  faTrashArrowUp = faTrashArrowUp;
  public isLoading = false;

  ngOnInit(): void {

  }

  constructor(private batchStandardService: BatchStandardService,
    private route: ActivatedRoute, private loginService: LoginService,
    private alertService: AlertService){}


  removeFromClass(bs: BatchStandardStudent): void {
    this.isLoading = true;
    if(confirm("Are you sure to leave student from academy?")) {
      if(bs.id != undefined) {
        this.batchStandardService.deleteBatchStandardStudent(bs.batch_standard_id, bs.id).subscribe (
          (response: any) => this.removeBatchStandardStudent(bs),
          (error: any) => this.errorHandle(error),
          () => this.isLoadingFalse()
        ); 
      }
    }
  }
  
  removeBatchStandardStudent(response: any) {
    this.batchStandardStudents = this.batchStandardStudents.filter((bss) => bss.id != response.id)
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if(error.status == 403) {
      this.alertService.error("Unauthorized");
    } else {
      
      
    }
    this.isLoading = false;
  }

  isLoadingFalse() {
    this.isLoading = false;
  }

  isAssignClass(): boolean { 
    return this.loginService.isAdminAccountant();
  }
}
