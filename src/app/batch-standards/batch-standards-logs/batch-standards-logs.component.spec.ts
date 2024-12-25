import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchStandardsLogsComponent } from './batch-standards-logs.component';

describe('BatchStandardsLogsComponent', () => {
  let component: BatchStandardsLogsComponent;
  let fixture: ComponentFixture<BatchStandardsLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchStandardsLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchStandardsLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
