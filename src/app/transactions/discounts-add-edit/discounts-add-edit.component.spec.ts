import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsAddEditComponent } from './discounts-add-edit.component';

describe('DiscountsAddEditComponent', () => {
  let component: DiscountsAddEditComponent;
  let fixture: ComponentFixture<DiscountsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
