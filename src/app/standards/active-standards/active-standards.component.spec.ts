import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStandardsComponent } from './active-standards.component';

describe('ActiveStandardsComponent', () => {
  let component: ActiveStandardsComponent;
  let fixture: ComponentFixture<ActiveStandardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveStandardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveStandardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
