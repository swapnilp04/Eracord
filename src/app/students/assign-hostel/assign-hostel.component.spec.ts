import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHostelComponent } from './assign-hostel.component';

describe('AssignHostelComponent', () => {
  let component: AssignHostelComponent;
  let fixture: ComponentFixture<AssignHostelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignHostelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignHostelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
