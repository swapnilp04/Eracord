import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAttendanceStudentsComponent } from './log-attendance-students.component';

describe('LogAttendanceStudentsComponent', () => {
  let component: LogAttendanceStudentsComponent;
  let fixture: ComponentFixture<LogAttendanceStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogAttendanceStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAttendanceStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
