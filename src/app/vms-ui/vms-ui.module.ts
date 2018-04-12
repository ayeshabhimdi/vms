import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { VisualizationModule } from '../visualization/visualization.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { AttributeSelectorsComponent } from './attribute-selectors/attribute-selectors.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VisualizationModule
  ],
  exports: [
   HomeComponent
  ],
  declarations: [ SidenavComponent, HomeComponent, AttributeSelectorsComponent ]
})
export class VmsUiModule { }
