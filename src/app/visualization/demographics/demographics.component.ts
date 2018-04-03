import { Component,
  OnInit,
  ElementRef,
  Input
} from '@angular/core';

import * as d3Scale from 'd3-scale';
import * as d3Format from 'd3-format';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';

import { DataPreprocessorService } from './shared/data-preprocessor.service';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.sass'],
  providers: [DataPreprocessorService]
})
export class DemographicsComponent implements OnInit {
  @Input() selectedMakerspace: any;

  parentNativeElement: ElementRef;
  width = 210;
  height = 350;
  baseSVG: any;
  xScale: any;
  yScale: any;
  zScale: any;
  data: any;
  xScaleDomain: any;
  yScaleDomain: any;
  zScaleDomain: any;

  constructor(element: ElementRef, dataPreprocess: DataPreprocessorService) {
    this.parentNativeElement = element.nativeElement; // 1
    this.data = dataPreprocess.processedData; // 12
  }

  ngOnInit() {
  }
  initVisualization() {
    const container = d3Selection.select(this.parentNativeElement)
      .select('#demographicsContainer');

    this.baseSVG = container.append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');

    this.makeDomains();

  }

  makeDomains() {
    // let [age_0to5, age_6to10, age_11to15, age_16to20, age_above20, age_dont_know ] = [1, 2, 3, 4, 5, 0];

    // let {[ age_0to5, age_6to10, age_11to15, age_16to20, age_above20, age_dont_know ] : this.xScaleDomain} = this.selectedMakerspace;
  }
  // set scales
  setScales() {
    this.xScale = d3Scale.scaleBand()
    .domain()
    .rangeRound([0, this.width])
    .paddingInner(0.05)
    .align(0.1);

    this.yScale = d3Scale.scaleLinear()
    .rangeRound([this.height, 0]);

    this.zScale = d3Scale.scaleOrdinal()
    .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

  }

  drawStackedBarChart() {

  }

}
