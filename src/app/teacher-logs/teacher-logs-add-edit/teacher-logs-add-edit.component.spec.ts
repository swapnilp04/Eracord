import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLogsAddEditComponent } from './teacher-logs-add-edit.component';

describe('TeacherLogsAddEditComponent', () => {
  let component: TeacherLogsAddEditComponent;
  let fixture: ComponentFixture<TeacherLogsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherLogsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherLogsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
