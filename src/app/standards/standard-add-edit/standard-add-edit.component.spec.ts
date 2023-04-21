import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardAddEditComponent } from './standard-add-edit.component';

describe('StandardAddEditComponent', () => {
  let component: StandardAddEditComponent;
  let fixture: ComponentFixture<StandardAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
