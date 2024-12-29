import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupResultComponent } from './group-result.component';

describe('GroupResultComponent', () => {
  let component: GroupResultComponent;
  let fixture: ComponentFixture<GroupResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
