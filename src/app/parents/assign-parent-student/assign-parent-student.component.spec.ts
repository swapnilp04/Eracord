import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignParentStudentComponent } from './assign-parent-student.component';

describe('AssignParentStudentComponent', () => {
  let component: AssignParentStudentComponent;
  let fixture: ComponentFixture<AssignParentStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignParentStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignParentStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
