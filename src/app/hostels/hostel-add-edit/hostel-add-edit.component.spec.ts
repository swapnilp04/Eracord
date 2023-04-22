import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelAddEditComponent } from './hostel-add-edit.component';

describe('HostelAddEditComponent', () => {
  let component: HostelAddEditComponent;
  let fixture: ComponentFixture<HostelAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostelAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
