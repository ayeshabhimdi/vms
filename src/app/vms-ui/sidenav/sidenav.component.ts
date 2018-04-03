import { Component, OnInit, SimpleChange, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenavElement: any;
  makerspaceName = 'sample';
  selectedMakerspace: any;

  constructor() { }

  ngOnInit() {
  }

  onNodeClick(data: any) {
    this.selectedMakerspace = data.properties;
    this.makerspaceName = data.properties.program_name;
    this.sidenavElement.open();
    }
  }
