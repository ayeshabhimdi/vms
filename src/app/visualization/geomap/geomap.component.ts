import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

import { DataPreprocessorService } from '../shared/data-preprocessor.service';
import * as us10m from '../shared/us-10m.json';

@Component({
  selector: 'app-visualization-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css'],
  providers: [DataPreprocessorService]
})
export class GeomapComponent implements OnInit {
  parentNativeElement: ElementRef;
  width = window.innerWidth - 300;
  height = window.innerHeight - 200;
  baseSVG: any;

  constructor(element: ElementRef, public dataPreprocess: DataPreprocessorService) {
    this.parentNativeElement = element.nativeElement; // to get native parent element of this component
  }

  ngOnInit() {
    this.drawVisualization();
  }

  zoom() {
    d3.zoom().scaleExtent([1, 10])
      .on('zoom', () => this.zoomed());
  }

  /*This function adds zoom functionality on the map SVG layer */
  zoomed() {
    console.log('zooomed');
    this.baseSVG.attr(
      'transform', d3.event.transform
    ); // applying a event transform on map svg layer.
  }


  drawVisualization() {
    const container = d3.select(this.parentNativeElement)
      .select('#geomapContainer');

    this.baseSVG = container.append('svg')
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .classed('svg-content-responsive', true)
      .call(this.zoom);

    const projection = d3.geoAlbers();
    const path = d3.geoPath(projection);
    const features = topojson.feature(us10m, us10m.objects.states).features;

    const states = this.baseSVG.selectAll('path')
      .data(features)
      .enter()
      .append('path')
      .style('fill', 'gray')
      .style('stroke', 'black')
      .attr('d', path);
  }
}


