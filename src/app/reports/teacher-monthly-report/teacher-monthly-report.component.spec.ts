import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMonthlyReportComponent } from './teacher-monthly-report.component';

describe('TeacherMonthlyReportComponent', () => {
  let component: TeacherMonthlyReportComponent;
  let fixture: ComponentFixture<TeacherMonthlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherMonthlyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
