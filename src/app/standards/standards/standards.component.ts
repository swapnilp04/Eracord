import { Component, OnInit } from '@angular/core';
import {StandardService} from './../../service/standard.service';
import {Standard} from './../../interface/standard';


@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.css']
})

export class StandardsComponent  implements OnInit {

  public standards: Standard[] = [];
  constructor(private standardService: StandardService){}


  ngOnInit(): void {
    this.loadStandards();
  }

  loadStandards(): void {
    this.standardService.getStandards().subscribe (
      (response: any) => this.assignStandard(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Standards......')
    );
  }

  loadStandard(standardID: number): void {
    this.standardService.getStandard(standardID).subscribe (
      (response: any) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Standard......')
    );
  }

  createStandard(standard: Standard): void {
    this.standardService.createStandard(standard).subscribe (
      (response: any) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Standard......')
    );
  }

    assignStandard(response: any) {
      this.standards = response
    }
}
