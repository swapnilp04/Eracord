import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLogsComponent } from './teacher-logs.component';

describe('TeacherLogsComponent', () => {
  let component: TeacherLogsComponent;
  let fixture: ComponentFixture<TeacherLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
