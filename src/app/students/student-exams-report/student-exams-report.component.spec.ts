import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamsReportComponent } from './student-exams-report.component';

describe('StudentExamsReportComponent', () => {
  let component: StudentExamsReportComponent;
  let fixture: ComponentFixture<StudentExamsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentExamsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExamsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
