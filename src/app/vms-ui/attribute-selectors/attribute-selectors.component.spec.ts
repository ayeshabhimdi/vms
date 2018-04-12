import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeSelectorsComponent } from './attribute-selectors.component';

describe('AttributeSelectorsComponent', () => {
  let component: AttributeSelectorsComponent;
  let fixture: ComponentFixture<AttributeSelectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeSelectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
