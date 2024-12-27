import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedClassAddEditComponent } from './combined-class-add-edit.component';

describe('CombinedClassAddEditComponent', () => {
  let component: CombinedClassAddEditComponent;
  let fixture: ComponentFixture<CombinedClassAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinedClassAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedClassAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
