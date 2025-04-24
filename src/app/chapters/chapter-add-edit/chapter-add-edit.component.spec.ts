import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterAddEditComponent } from './chapter-add-edit.component';

describe('ChapterAddEditComponent', () => {
  let component: ChapterAddEditComponent;
  let fixture: ComponentFixture<ChapterAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
