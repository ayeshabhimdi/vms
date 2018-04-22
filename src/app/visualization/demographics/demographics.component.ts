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
  width = window.innerWidth / 3;
  height = window.innerHeight / 3;
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
    this.parentNativeElement = element.nativeElement;
    console.log(this.selectedMakerspace);
    this.data = dataPreprocess.processedData;
  }

  ngOnInit() {
    this.makeDomains();
        this.setScales();
        this.initVisualization();
        this.drawBarChart();
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
      .attr('width', this.width + 200)
      .attr('height', this.height + 200)
      .append('g');

    this.makeDomains();
  }

  makeDomains() {
    this.xScaleDomain = ['age_0to5', 'age_6to10', 'age_11to15', 'age_16to20', 'age_above20' ];
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
          { key: 'age_above20', value: age_above20 }
        ];
        return [
        age_0to5,
        age_6to10,
        age_11to15,
        age_16to20,
        age_above20
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
    .rangeRound([this.height - 15, 0]);
  }

  drawBarChart() {
  // append the rectangles for the bar chart
  this.baseSVG.selectAll('.bar')
  .data(this.mappedData)
  .enter().append('rect')
  .attr('class', 'bar')
 .attr('y', (d) => Math.abs(this.height - this.yScale(d.value)))
  .attr('height', (d) => this.yScale(d.value) - 18)
  .attr('x', (d) => this.xScale(d.key))
  .attr('width', this.xScale.bandwidth())
  .attr('transform', 'translate(20,0)');
 // .attr('transform', (d,i) => 'translate(d.width*i, 0)');

    // add the x Axis
  this.baseSVG.append('g')
  // .attr('transform', 'translate(0,' + this.height + ')')
   .attr('transform', (d) => 'translate(20,' + (this.height - 18)  + ')')
   .attr('class', 'xAxis')
    .call(d3Axis.axisBottom(this.xScale));

  //   // add the y Axis
  // this.baseSVG.append('g')
  //   .attr('class', 'yAxis')
  //   .attr('transform', 'translate(18,0)')
  //   .call(d3Axis.axisLeft(this.yScale));

  }

}
