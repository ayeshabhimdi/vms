import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule
  ],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule
  ],
  declarations: []
})
export class SharedModule { }
