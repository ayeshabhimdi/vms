import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeomapComponent } from './geomap/geomap.component';
import { DemographicsComponent } from './demographics/demographics.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    GeomapComponent,
    DemographicsComponent,

  ],
  declarations: [GeomapComponent, DemographicsComponent]
})
export class VisualizationModule { }
