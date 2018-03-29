import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  imports: [ BrowserAnimationsModule, CommonModule, MatSidenavModule ],
  exports: [ BrowserAnimationsModule, CommonModule, MatSidenavModule ],
  declarations: []
})
export class SharedModule { }
