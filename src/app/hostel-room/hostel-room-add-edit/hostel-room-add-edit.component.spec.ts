import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelRoomAddEditComponent } from './hostel-room-add-edit.component';

describe('HostelRoomAddEditComponent', () => {
  let component: HostelRoomAddEditComponent;
  let fixture: ComponentFixture<HostelRoomAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostelRoomAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelRoomAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
