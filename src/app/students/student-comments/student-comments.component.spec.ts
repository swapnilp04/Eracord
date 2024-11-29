import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCommentsComponent } from './student-comments.component';

describe('StudentCommentsComponent', () => {
  let component: StudentCommentsComponent;
  let fixture: ComponentFixture<StudentCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
