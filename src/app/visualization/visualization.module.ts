import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeomapComponent } from './geomap/geomap.component';
import { DemographicsComponent } from './demographics/demographics.component';
import { VmsLegendComponent } from './vms-legend/vms-legend.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    MatChipsModule
  ],
  exports: [
    GeomapComponent,
    DemographicsComponent,
    VmsLegendComponent
  ],
  declarations: [GeomapComponent, DemographicsComponent, VmsLegendComponent]
})
export class VisualizationModule { }
