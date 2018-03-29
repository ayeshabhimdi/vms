import { Component, OnInit, SimpleChange, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenavElement: any;
  makerspaceName = 'sample';

  constructor() { }

  ngOnInit() {
  }

  onNodeClick(data: any) {
    this.makerspaceName = data.properties.name;
    this.sidenavElement.open();
    }
  }
}
