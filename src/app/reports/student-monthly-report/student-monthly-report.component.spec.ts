import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMonthlyReportComponent } from './student-monthly-report.component';

describe('StudentMonthlyReportComponent', () => {
  let component: StudentMonthlyReportComponent;
  let fixture: ComponentFixture<StudentMonthlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMonthlyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
