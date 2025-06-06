import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAddEditComponent } from './subject-add-edit.component';

describe('SubjectAddEditComponent', () => {
  let component: SubjectAddEditComponent;
  let fixture: ComponentFixture<SubjectAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
