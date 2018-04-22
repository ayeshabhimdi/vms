import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmsLegendComponent } from './vms-legend.component';

describe('VmsLegendComponent', () => {
  let component: VmsLegendComponent;
  let fixture: ComponentFixture<VmsLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmsLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmsLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
