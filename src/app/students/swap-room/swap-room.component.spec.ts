import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapRoomComponent } from './swap-room.component';

describe('SwapRoomComponent', () => {
  let component: SwapRoomComponent;
  let fixture: ComponentFixture<SwapRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
