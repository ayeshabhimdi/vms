import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendExpansionComponent } from './legend-expansion.component';

describe('LegendExpansionComponent', () => {
  let component: LegendExpansionComponent;
  let fixture: ComponentFixture<LegendExpansionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendExpansionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
