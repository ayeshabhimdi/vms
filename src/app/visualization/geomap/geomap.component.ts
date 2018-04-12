import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  Output } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

import { DataPreprocessorService } from './shared/data-preprocessor.service';
import * as us10m from '../shared/us-10m.json';


@Component({
  selector: 'app-visualization-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass'],
  providers: [DataPreprocessorService]
})
export class GeomapComponent implements OnInit {
  @Output() nodeclick: EventEmitter<any> = new EventEmitter();

  parentNativeElement: ElementRef;
  width = 910;
  height = 650;
  baseSVG: any;
  mapSVG: any;
  zoom: any;
  data: any;

  constructor(element: ElementRef, public dataPreprocess: DataPreprocessorService) {
    this.parentNativeElement = element.nativeElement; // to get native parent element of this component
    this.data = dataPreprocess.processedData;
  }

  ngOnInit() {
    this.drawVisualization();
  }

  /*This function adds zoom functionality on the map SVG layer */
  zoomed() {
    this.mapSVG.attr(
      'transform', d3.event.transform
    ); // applying an event transform on map svg layer.
  }

  drawVisualization() {
    const projection = d3.geoAlbers()
                          .scale( 600 )
                          .center( [0, 152.313] ); // added scale and center
    const path = d3.geoPath().projection( projection );
    const features = topojson.feature(us10m, us10m.objects.states).features;

    const container = d3.select(this.parentNativeElement)
      .select('#geomapContainer');

    this.zoom = d3.zoom().scaleExtent([1, 10]) // zoom config
      .on('zoom', () => this.zoomed());

    this.baseSVG = container.append('svg') // base SVG container and its props
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .classed('svg-content-responsive', true)
      .call(this.zoom)
      .attr('fill', 'aliceblue');

    this.mapSVG = this.baseSVG.append('g') // map base layer added to svg container
      .attr('class', 'maplayer');

    const states = this.mapSVG.selectAll('path') // Select non-existent elements, bind the data, append the elements
      .data(features)
      .enter()
      .append('path')
      .style('fill', 'white')
      .style('stroke', 'black')
      .attr('d', path);

    // adding data to the map
      const points = this.mapSVG.append('g');

      points.selectAll('path')
        .data(this.data.features)
        .enter()
        .append('path')
        .attr('fill', 'blue')
        .attr( 'd', path)
        .style('opacity', 0.5)
        .style('cursor', 'pointer')
        .attr('r', this.data.participant_year)
        .on('click', (d) => this.nodeclick.emit(d));
  }

}
