import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelStudentsComponent } from './hostel-students.component';

describe('HostelStudentsComponent', () => {
  let component: HostelStudentsComponent;
  let fixture: ComponentFixture<HostelStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostelStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
