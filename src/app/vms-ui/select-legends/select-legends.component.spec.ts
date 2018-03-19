import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLegendsComponent } from './select-legends.component';

describe('SelectLegendsComponent', () => {
  let component: SelectLegendsComponent;
  let fixture: ComponentFixture<SelectLegendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLegendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
