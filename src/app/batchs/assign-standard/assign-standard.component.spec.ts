import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStandardComponent } from './assign-standard.component';

describe('AssignStandardComponent', () => {
  let component: AssignStandardComponent;
  let fixture: ComponentFixture<AssignStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignStandardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
