import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
<<<<<<< HEAD

=======
import { MatToolbarModule } from '@angular/material/toolbar';
>>>>>>> 016dc93a10671fd512a819e21bffd2307c5a63a3

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
<<<<<<< HEAD
    MatExpansionModule
=======
    MatExpansionModule,
    MatToolbarModule
>>>>>>> 016dc93a10671fd512a819e21bffd2307c5a63a3
  ],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
<<<<<<< HEAD
    MatExpansionModule
=======
    MatExpansionModule,
    MatToolbarModule
>>>>>>> 016dc93a10671fd512a819e21bffd2307c5a63a3
  ],
  declarations: []
})
export class SharedModule { }
