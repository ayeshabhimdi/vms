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
  demographicsData: any;
  mappedData: any;

  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    for (const propName in changes) {
      if (propName === 'selectedMakerspace' && this[propName]) {
        const { age_0to5, age_6to10, age_11to15, age_16to20, age_above20 }  = this.selectedMakerspace;
        this.demographicsData =  [
          {  x: '0 - 5', y: age_0to5 },
          {  x: '6 - 10', y: age_6to10 },
          {  x: '11 - 15', y: age_11to15 },
          {  x: '16 - 20', y: age_16to20 },
          {  x: '>20', y: age_above20 }
         ];
        this.clearBarChart();
        this.makeDomains();
        // this.setScales();
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
      .attr('width', this.width + 300)
      .attr('height', this.height + 300)
      .append('g');

    // this.makeDomains();
  }

  makeDomains() {
    this.xScaleDomain = ['0 - 5', '6 - 10', '11 - 15', '16 - 20', '>20' ];
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

  drawBarChart() {
    this.xScale = d3Scale.scaleBand();
    const xAxis = d3Axis.axisBottom(this.xScale);
    this.xScale.domain(this.xScaleDomain)
          .range([0, this.width])
          .padding(0.1);

    const xAxisGroup = this.baseSVG.append('g')
          .attr('transform', 'translate(50, ' + this.height + ')')
          .attr('class', 'xAxis')
          .call(xAxis);

    this.yScale = d3Scale.scaleLinear();
    const yAxis = d3Axis.axisLeft(this.yScale);
    this.yScale.domain([0, d3Array.max(this.yScaleDomain)])
          .range([this.height, 0]);

    const yAxisGroup = this.baseSVG.append('g')
          .attr('transform', 'translate(50, 10)')
          .attr('class', 'yAxis')
          .call(yAxis);

    const bars = this.baseSVG.selectAll('.bar')
      .data(this.demographicsData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => 50 + this.xScale(d.x))
      .attr('y', (d) => this.yScale(d.y))
      .attr('width', this.xScale.bandwidth())
      .attr('height', (d) => this.height - this.yScale(d.y));

    // text label for the x axis
     this.baseSVG.append('text')
     .attr('transform',
       'translate(' + (this.width / 2) + ' ,' +
       (this.height + 40) + ')')
     .attr('id', 'xAxisLabel')
     .style('text-anchor', 'middle')
     .text('Age Range (In years)');

    // text label for the y axis
    this.baseSVG.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 )
    .attr('x', 0 - (this.height / 2))
    .attr('dy', '1em')
    .attr('id', 'yAxisLabel')
    .style('text-anchor', 'middle')
    .text('Number of Student Participants');
  }
}
