import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupResultDisplayComponent } from './group-result-display.component';

describe('GroupResultDisplayComponent', () => {
  let component: GroupResultDisplayComponent;
  let fixture: ComponentFixture<GroupResultDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupResultDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupResultDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
