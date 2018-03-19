import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { VisualizationModule } from './visualization';
import { VmsUiModule } from './vms-ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VisualizationModule,
    VmsUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
