import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../service/student.service';
import { HostelService } from './../../service/hostel.service';
import { HostelRoomService } from './../../service/hostel-room.service';
import { LoginService } from './../../service/login.service';
import { Student } from './../../interface/student';
import { Hostel } from './../../interface/hostel';
import { HostelRoom } from './../../interface/hostel-room';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-assign-hostel',
  templateUrl: './assign-hostel.component.html',
  styleUrls: ['./assign-hostel.component.css']
})

export class AssignHostelComponent implements OnInit {
  public student = {} as Student;
  public id: any;

  public hostels: Hostel[] = [];
  public hostelRooms: HostelRoom[] = [];
  public isLoading = false;
  public selectedHosteId: number = 0;
  public selectedHostelRoom: number = 0;
  public feeIncluded= false;
  public feeIteration = "Yearly";
  
  constructor(private studentService: StudentService, private hostelService: HostelService, private hostelRoomService: HostelRoomService, 
    private route: ActivatedRoute, private location: Location, private router: Router, private loginService: LoginService, 
    private alertService: AlertService){}
  
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

  onChangeHostel(newObj: number): void {
    while(this.hostelRooms.length > 0) {
      this.hostelRooms.pop();
    }
    this.selectedHosteId = newObj;
    this.getHostelRooms(this.selectedHosteId);
  }

  onChangeIteration(newObj: string): void {
    this.feeIteration = newObj;
  }

  loadStudent(studentID: number): void {
    this.isLoading = true;
    this.studentService.getStudent(studentID).subscribe (
      (response: any) => this.assignStudent(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  assignStudent(response: any) {
    this.student = response;
    this.loadHostels();
  }

  back(): void {
    this.router.navigate(['/students', this.id]);
  }

  assignHostelRoom(): void {
    if(this.selectedHosteId != 0 && this.selectedHostelRoom != 0) {
      this.isLoading = true;
      this.studentService.assignStudentHostel(this.id, this.selectedHosteId, this.selectedHostelRoom, this.feeIncluded, this.feeIteration).subscribe (
        (response: any) => this.onSuccessAssignHostel(response),
        (error: any) => this.errorHandle(error),
        () => this.isLoadingFalse()
      );
    }
  }

  onSuccessAssignHostel(response: any): void {
    this.router.navigate(['/students', this.student.id], { replaceUrl: true });
    this.alertService.success("Hostel Has been assigned Successful");
  }

  onFeeInckudedChanged(e: any) {
    this.feeIncluded = e.target.checked
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }

  loadHostels(): void {
    this.isLoading = true;
    this.hostelService.getHostels().subscribe (
      (response: any) => this.assignHostels(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  assignHostels(response: any) {
    this.hostels = response
  }

  getHostelRooms(hostelId: number): void {
    this.isLoading = true;
    this.hostelRoomService.getHostelRooms(hostelId).subscribe (
      (response: any) => this.assignHostelRooms(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    ); 
  }

  assignHostelRooms(response: any) {
    this.hostelRooms = response
  }

  selectRoom(roomId: any): void {
    this.selectedHostelRoom = roomId;
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }

  isAdminAccountant(): boolean {
    return this.loginService.isAdminAccountant()
  }
}
