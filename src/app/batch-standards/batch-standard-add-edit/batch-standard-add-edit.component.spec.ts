import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchStandardAddEditComponent } from './batch-standard-add-edit.component';

describe('BatchStandardAddEditComponent', () => {
  let component: BatchStandardAddEditComponent;
  let fixture: ComponentFixture<BatchStandardAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchStandardAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchStandardAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
