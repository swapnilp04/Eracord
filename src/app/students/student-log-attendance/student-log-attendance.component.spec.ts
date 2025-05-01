import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLogAttendanceComponent } from './student-log-attendance.component';

describe('StudentLogAttendanceComponent', () => {
  let component: StudentLogAttendanceComponent;
  let fixture: ComponentFixture<StudentLogAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentLogAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLogAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
