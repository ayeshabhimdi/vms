import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { VisualizationModule } from './visualization';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VisualizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
