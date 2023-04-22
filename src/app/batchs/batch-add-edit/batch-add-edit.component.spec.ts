import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAddEditComponent } from './batch-add-edit.component';

describe('BatchAddEditComponent', () => {
  let component: BatchAddEditComponent;
  let fixture: ComponentFixture<BatchAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
