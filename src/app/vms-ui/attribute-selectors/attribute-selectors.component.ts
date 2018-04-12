import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute-selectors',
  templateUrl: './attribute-selectors.component.html',
  styleUrls: ['./attribute-selectors.component.sass']
})
export class AttributeSelectorsComponent implements OnInit {
  selected = 'option2';
  sizeAttributes = ['blah1', 'blah2'];
  colorAttributes = ['color1', 'color2'];

  constructor() { }

  ngOnInit() {
  }

}
