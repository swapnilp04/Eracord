import { Component, OnInit } from '@angular/core';
import {HostelService} from './../../service/hostel.service';
import {Hostel} from './../../interface/hostel';


@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.css']
})


export class HostelsComponent  implements OnInit {

  public hostels: Hostel[] = [];
  constructor(private hostelService: HostelService){}


  ngOnInit(): void {
    this.loadHostels();
  }

  loadHostels(): void {
    this.hostelService.getHostels().subscribe (
      (response: any) => this.assignHostel(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostels......')
    );
  }


  assignHostel(response: any) {
    this.hostels = response
  }
}
