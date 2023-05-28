import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccountsComponent } from './student-accounts.component';

describe('StudentAccountsComponent', () => {
  let component: StudentAccountsComponent;
  let fixture: ComponentFixture<StudentAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
