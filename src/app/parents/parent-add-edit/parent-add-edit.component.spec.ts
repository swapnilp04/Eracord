import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAddEditComponent } from './parent-add-edit.component';

describe('ParentAddEditComponent', () => {
  let component: ParentAddEditComponent;
  let fixture: ComponentFixture<ParentAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
