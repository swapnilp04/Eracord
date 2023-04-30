import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchStandardStudentsComponent } from './batch-standard-students.component';

describe('BatchStandardStudentsComponent', () => {
  let component: BatchStandardStudentsComponent;
  let fixture: ComponentFixture<BatchStandardStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchStandardStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchStandardStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
