import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { VisualizationModule } from './visualization';

import { AppComponent } from './app.component';
import { RightTabComponent } from './vms-ui/right-tab/right-tab.component';
import { SelectLegendsComponent } from './vms-iu/select-legends/select-legends.component';


@NgModule({
  declarations: [
    AppComponent,
    RightTabComponent,
    SelectLegendsComponent
  ],
  imports: [
    BrowserModule,
    VisualizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
