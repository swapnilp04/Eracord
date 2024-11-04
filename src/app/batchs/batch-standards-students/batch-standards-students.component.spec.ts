import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchStandardsStudentsComponent } from './batch-standards-students.component';

describe('BatchStandardsStudentsComponent', () => {
  let component: BatchStandardsStudentsComponent;
  let fixture: ComponentFixture<BatchStandardsStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchStandardsStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchStandardsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

