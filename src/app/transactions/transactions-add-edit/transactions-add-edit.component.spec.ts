import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAddEditComponent } from './transactions-add-edit.component';

describe('TransactionsAddEditComponent', () => {
  let component: TransactionsAddEditComponent;
  let fixture: ComponentFixture<TransactionsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
