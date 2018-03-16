import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { DataPreprocessorService } from '../shared/data-preprocessor.service';

@Component({
  selector: 'app-visualization-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css'],
  providers: [DataPreprocessorService]
})
export class GeomapComponent implements OnInit {
  parentNativeElement: ElementRef;
  width = 960;
  height = 1160;

  constructor(element: ElementRef, public dataPreprocess: DataPreprocessorService) {
    this.parentNativeElement = element.nativeElement; // to get native parent element of this component
  }

  ngOnInit() {
    this.drawVisualization();
  }

  drawVisualization() {
    const container = d3.select(this.parentNativeElement)
      .select('#geomapContainer'); // dont change

    const baseSVG = container.append('svg') // change width and height according to geomap
      .attr('class', 'baseSVG')
      .attr('width', this.width)
      .attr('height', this.height);

      d3.json('../shared/us-10m.json', (error, us) => {
        if (error) {
        return console.error(error);
        }
        console.log(us);
        // svg.append("path")
        //     .datum(topojson.feature(uk, uk.objects.subunits))
        //     .attr("d", d3.geo.path().projection(d3.geo.mercator()));
      });
  }
}


