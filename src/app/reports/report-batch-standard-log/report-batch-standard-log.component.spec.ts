import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBatchStandardLogComponent } from './report-batch-standard-log.component';

describe('ReportBatchStandardLogComponent', () => {
  let component: ReportBatchStandardLogComponent;
  let fixture: ComponentFixture<ReportBatchStandardLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBatchStandardLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportBatchStandardLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
