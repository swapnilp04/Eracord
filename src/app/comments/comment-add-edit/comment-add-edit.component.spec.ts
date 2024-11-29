import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAddEditComponent } from './comment-add-edit.component';

describe('CommentAddEditComponent', () => {
  let component: CommentAddEditComponent;
  let fixture: ComponentFixture<CommentAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
