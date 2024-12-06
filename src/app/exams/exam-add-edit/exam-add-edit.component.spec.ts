import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAddEditComponent } from './exam-add-edit.component';

describe('ExamAddEditComponent', () => {
  let component: ExamAddEditComponent;
  let fixture: ComponentFixture<ExamAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
