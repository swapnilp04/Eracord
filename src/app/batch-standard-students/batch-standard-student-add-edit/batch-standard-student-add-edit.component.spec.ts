import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchStandardStudentAddEditComponent } from './batch-standard-student-add-edit.component';

describe('BatchStandardStudentAddEditComponent', () => {
  let component: BatchStandardStudentAddEditComponent;
  let fixture: ComponentFixture<BatchStandardStudentAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchStandardStudentAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchStandardStudentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
