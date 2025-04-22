import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsLineGraphComponent } from './graphs-line-graph.component';

describe('GraphsLineGraphComponent', () => {
  let component: GraphsLineGraphComponent;
  let fixture: ComponentFixture<GraphsLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphsLineGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphsLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
