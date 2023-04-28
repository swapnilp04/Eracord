import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchStandardsComponent } from './batch-standards.component';

describe('BatchStandardsComponent', () => {
  let component: BatchStandardsComponent;
  let fixture: ComponentFixture<BatchStandardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchStandardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchStandardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
