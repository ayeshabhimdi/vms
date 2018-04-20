import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

import { DataPreprocessorService } from '../shared/geomap/data-preprocessor.service';
import { makerspaceTypeColorMapping,
  outOfSchoolTypeColorMapping,
  participantTypeSizeMapping
} from '../shared/geomap/encoding_mappings';
import * as us10m from '../shared/geomap/us-10m.json';


@Component({
  selector: 'app-visualization-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass'],
  providers: [DataPreprocessorService]
})
export class GeomapComponent implements OnInit, OnChanges {
  @Input() selectedColorEncoding: any;
  @Input() selectedSizeEncoding: any;
  @Input() defaultPointSizeRange = [5, 22];
  @Output() nodeclick: EventEmitter<any> = new EventEmitter();

  parentNativeElement: ElementRef;
  width = 910;
  height = 650;
  baseSVG: any;
  mapSVG: any;
  zoom: any;
  data: any;
  yScale: any;
  xAxis: any;
  yAxis: any;
  xScaleDomain: any;
  yScaleDomain: any;
  pointSizeScale: any;

  constructor(element: ElementRef, public dataPreprocess: DataPreprocessorService) {
    this.parentNativeElement = element.nativeElement; // to get native parent element of this component
    this.data = dataPreprocess.processedData;
  }

  ngOnInit() {
    this.pointSizeScale = d3.scaleLinear().domain([0, d3.max(this.data.features, (d) => Number(d.properties.participant_day) )])
        .range(this.defaultPointSizeRange);
    this.drawVisualization();
  }

  ngOnChanges(changes: SimpleChanges) {
    // size encoding
    if (('selectedSizeEncoding' in changes) && !(changes.selectedSizeEncoding.isFirstChange())) {
      if ( changes.selectedSizeEncoding.currentValue === 'participant_day') {
        this.pointSizeScale = d3.scaleLinear().domain([0, d3.max(this.data.features, (d) => Number(d.properties.participant_day) )])
        .range(this.defaultPointSizeRange);
        this.baseSVG.selectAll('circle').transition().attr('r', (d) => this.pointSizeScale(d.properties.participant_day));
    }
  }
  if (('selectedSizeEncoding' in changes) && !(changes.selectedSizeEncoding.isFirstChange())) {
    this.pointSizeScale = d3.scaleLinear().domain([0, d3.max(this.data.features, (d) => Number(d.properties.staff_overall) )])
        .range(this.defaultPointSizeRange);
    if ( changes.selectedSizeEncoding.currentValue === 'staff_overall') {
    this.baseSVG.selectAll('circle').transition().attr('r', (d) => this.pointSizeScale(d.properties.staff_overall));
  }
}
    // color encoding
    if (('selectedColorEncoding' in changes) && !(changes.selectedColorEncoding.isFirstChange())) {
      if ( changes.selectedColorEncoding.currentValue === 'type') {
      this.baseSVG.selectAll('circle').transition().attr('fill', (d) =>
        makerspaceTypeColorMapping[d.properties.type]);
      }
    }
    if (('selectedColorEncoding' in changes) && !(changes.selectedColorEncoding.isFirstChange())) {
      if ( changes.selectedColorEncoding.currentValue === 'out_of_school') {
      this.baseSVG.selectAll('circle').transition().attr('fill', (d) =>
      outOfSchoolTypeColorMapping[d.properties.out_of_school]);
      }
    }

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

      points.selectAll('circle')
        .data(this.data.features)
        .enter()
        .append('circle')
        .attr('fill', d => makerspaceTypeColorMapping[d.properties.type]) // pass d as array
        .style('opacity', 0.5)
        .attr('stroke', 'black')
        .attr('cx', (d) => projection(d.geometry.coordinates)[0])
        .attr('cy', (d) => projection(d.geometry.coordinates)[1])
        .attr('r', (d) => this.pointSizeScale(d.properties.participant_day))
        .style('cursor', 'pointer')
        .on('click', (d) => this.nodeclick.emit(d));
  }

}
