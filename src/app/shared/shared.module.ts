import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [ BrowserAnimationsModule, CommonModule, MatSidenavModule, MatButtonModule ],
  exports: [ BrowserAnimationsModule, CommonModule, MatSidenavModule, MatButtonModule ],
  declarations: []
})
export class SharedModule { }
