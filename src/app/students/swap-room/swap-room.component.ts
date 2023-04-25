import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../service/student.service';
import { HostelService } from './../../service/hostel.service';
import { HostelRoomService } from './../../service/hostel-room.service';
import { Student } from './../../interface/student';
import { Hostel } from './../../interface/hostel';
import { HostelRoom } from './../../interface/hostel-room';
import { Alert } from './../../interface/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-swap-room',
  templateUrl: './swap-room.component.html',
  styleUrls: ['./swap-room.component.css']
})
export class SwapRoomComponent {

  public student = {} as Student;
  public id: any;

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `Sutdent Created successfully. `
    }
  ];

  public hostels: Hostel[] = [];
  public hostelRooms: HostelRoom[] = [];
  public isLoading = true;
  public selectedHosteId: number = 0;
  public selectedHostelRoom: number = 0;
  
  constructor(private studentService: StudentService, private hostelService: HostelService, private hostelRoomService: HostelRoomService, 
    private route: ActivatedRoute, private location: Location, private router: Router){}
  
  ngOnInit(): void {
    
    this.route.queryParams.subscribe((param) => {
      if (param['success'] == 'true') {
      }
    });

    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));
      
      this.loadStudent(this.id);
    });
  }

  onChangeHostel(newObj: number): void {
    while(this.hostelRooms.length > 0) {
      this.hostelRooms.pop();
    }
    this.selectedHosteId = newObj;
    this.getHostelRooms(this.selectedHosteId);
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
    this.isLoading = false;
    this.loadHostels();
  }

  back(): void {
    this.router.navigate(['/students', this.id]);
  }

  changeHostelRoom(): void {
    if(this.selectedHosteId != 0 && this.selectedHostelRoom != 0) {
      this.studentService.changeStudentHostel(this.id, this.selectedHosteId, this.selectedHostelRoom).subscribe (
        (response: any) => this.back(),
        (error: any) => console.log(error),
        () => console.log('Done getting Hostels......')
      );
    }
  }

  name(): string {
    return `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`
  }

  loadHostels(): void {
    this.hostelService.getHostels().subscribe (
      (response: any) => this.assignHostels(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostels......')
    );
  }

  assignHostels(response: any) {
    this.hostels = response
  }

  getHostelRooms(hostelId: number): void {
   this.hostelRoomService.getHostelRooms(hostelId).subscribe (
      (response: any) => this.assignHostelRooms(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostel Rooms......')
    ); 
  }

  assignHostelRooms(response: any) {
    this.hostelRooms = response
  }

  selectRoom(roomId: any): void {
    this.selectedHostelRoom = roomId;
  }
}
