import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamGraphReportsComponent } from './student-exam-graph-reports.component';

describe('StudentExamGraphReportsComponent', () => {
  let component: StudentExamGraphReportsComponent;
  let fixture: ComponentFixture<StudentExamGraphReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentExamGraphReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExamGraphReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
