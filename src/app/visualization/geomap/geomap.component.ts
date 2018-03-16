import { Component, OnInit, ElementRef } from '@angular/core';

import * as d3Select from 'd3-selection';
import {
  scaleLinear, scaleOrdinal, scalePow, scaleTime, scalePoint
} from 'd3-scale';
import * as d3Array from 'd3-array';

import { DataPreprocessorService } from '../shared/data-preprocessor.service';

@Component({
  selector: 'app-visualization-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css'],
  providers: [ DataPreprocessorService]
})
export class GeomapComponent implements OnInit {
  parentNativeElement: ElementRef;
  width = 420;
  barHeight = 20;

  constructor(element: ElementRef, public dataPreprocess: DataPreprocessorService) {
    this.parentNativeElement = element.nativeElement; // to get native parent element of this component
  }

  ngOnInit() {
    this.drawVisualization();
  }

  drawVisualization() {
    const container = d3Select.select(this.parentNativeElement)
      .select('#geomapContainer');

    const baseSVG = container.append('svg')
      .attr('class', 'baseSVG')
      .attr('width', this.width)
      .attr('height', this.barHeight * this.dataPreprocess.data.length);

    const x = scaleLinear(); // x-scale
    x.domain([0, d3Array.max(this.dataPreprocess.data)])
      .range([0, this.width]);

    const bars = baseSVG.selectAll('g').this.dataPreprocess.data(this.dataPreprocess.data)
      .enter().append('g')// entering bars
      .attr('transform', (d, i) => 'translate(0,' + i * this.barHeight + ')');

    bars.append('rect')
      .attr('width', (d) => x(d))
      .attr('height', this.barHeight - 1)
      .attr('fill', 'steelblue');

    bars.append('text')
      .attr('x', (d) => x(d) - 3)
      .attr('y', this.barHeight / 2)
      .attr('dy', '.35em')
      .text((d) => d)
      .attr('fill', 'black')
      .attr('font', '10px sans-serif')
      .attr('text-anchor', 'end');

    bars.exit().remove();
  }
}


