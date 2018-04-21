import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legend-expansion',
  templateUrl: './legend-expansion.component.html',
  styleUrls: ['./legend-expansion.component.sass']
})
export class LegendExpansionComponent implements OnInit {
  panelOpenState: boolean;
  // panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

}
