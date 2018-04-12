import { Component,
  OnInit,
  ElementRef,
  Input,
  OnChanges,
  SimpleChange
} from '@angular/core';

import * as d3Scale from 'd3-scale';
import * as d3Format from 'd3-format';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import * as d3Axis from 'd3-axis';

import { DataPreprocessorService } from './shared/data-preprocessor.service';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.sass'],
  providers: [DataPreprocessorService]
})
export class DemographicsComponent implements OnInit, OnChanges {
  @Input() selectedMakerspace: any;

  parentNativeElement: ElementRef;
  width = 400;
  height = 350;
  baseSVG: any;
  xScale: any;
  yScale: any;
  zScale: any;
  data: any;
  xScaleDomain: any;
  yScaleDomain: any;
  zScaleDomain: any;
  mappedData: any;

  constructor(element: ElementRef, dataPreprocess: DataPreprocessorService) {
    this.parentNativeElement = element.nativeElement; // 1
    console.log(this.selectedMakerspace);
    this.data = dataPreprocess.processedData; // 12
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    for (const propName in changes) {
      if (propName === 'selectedMakerspace' && this[propName]) {
        this.clearBarChart();
        this.makeDomains();
        this.setScales();
        this.initVisualization();
        this.drawBarChart();
      }
  }
  }
    // clear before new selection
    clearBarChart() {
      d3Selection.select(this.parentNativeElement)
        .select('#demographicsContainer').select('svg').remove();
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
    this.xScaleDomain = ['age_0to5', 'age_6to10', 'age_11to15', 'age_16to20', 'age_above20', 'age_dont_know'];
    this.yScaleDomain = (({
      age_0to5,
      age_6to10,
      age_11to15,
      age_16to20,
      age_above20,
      age_dont_know}) => {
        this.mappedData = [
          { key: 'age_0to5', value: age_0to5 },
          { key: 'age_6to10', value: age_6to10 },
          { key: 'age_11to15', value: age_11to15 },
          { key: 'age_16to20', value: age_16to20 },
          { key: 'age_above20', value: age_above20 },
          { key: 'age_dont_know', value: age_dont_know }
        ];
        return [
        age_0to5,
        age_6to10,
        age_11to15,
        age_16to20,
        age_above20,
        age_dont_know
      ];
    })(this.selectedMakerspace);

    // this.zScaleDomain = (({
    //   race_indian_alaska,
    //   race_asian,
    //   race_black,
    //   race_hawaiian_pacific,
    //   race_white,
    //   race_two_plus,
    //   race_dont_know }) => [
    //     race_indian_alaska,
    //     race_asian,
    //     race_black,
    //     race_hawaiian_pacific,
    //     race_white,
    //     race_two_plus,
    //     race_dont_know
    //   ])(this.selectedMakerspace);
  }
  // set scales
  setScales() {
    this.xScale = d3Scale.scaleBand()
    .domain(this.xScaleDomain)
    .rangeRound([0, this.width])
    .padding(0.1);

    this.yScale = d3Scale.scaleLinear()
    .domain(this.yScaleDomain)
    .rangeRound([this.height, 0]);
  }

  drawBarChart() {
  // append the rectangles for the bar chart
  this.baseSVG.selectAll('.bar')
  .data(this.mappedData)
  .enter().append('rect')
  .attr('class', 'bar')
  .attr('x', (d) => this.xScale(d.key) - 45)
  .attr('width', this.xScale.bandwidth())
  .attr('y', (d) => this.yScale(d.value))
  .attr('height', (d) => this.height - this.yScale(d.value) - 19);

    // add the x Axis
  this.baseSVG.append('g')
   // .attr('transform', 'translate(0,' + this.height + ')')
   .attr('transform', 'translate(20,' + (this.yScale(0) - 19) + ')')
   .attr('class', 'xAxis')
    .call(d3Axis.axisBottom(this.xScale));

    // add the y Axis
  this.baseSVG.append('g')
    .attr('class', 'yAxis')
    .attr('transform', 'translate(20,0)')
    .call(d3Axis.axisLeft(this.yScale));

  }

}
