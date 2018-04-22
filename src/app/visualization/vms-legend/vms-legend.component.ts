import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3Array from 'd3-array';
import * as d3Scale from 'd3-scale';
import * as d3Selection from 'd3-selection';
import * as d3Color from 'd3-color';
import * as mapData from '../shared/geomap/data_usa_all.json';

@Component({
  selector: 'app-vms-legend',
  templateUrl: './vms-legend.component.html',
  styleUrls: ['./vms-legend.component.sass']
})
export class VmsLegendComponent implements OnInit, OnChanges {
  @Input() selectedColorEncoding: any;
  @Input() selectedSizeEncoding: any;

  nodeSizeScale: any;
  nodeSizeRange = [5, 22];
  maxNodeSizeLabel: string;
  midNodeSizeLabel: string;
  minNodeSizeLabel: string;
  nodeSizeLegendTitle: string;
  colorMappingSelected: 'type';

  sizeAttributeMap = {
    'participant_day': 'Participants',
    'staff_overall': 'Staff Members'
  };
  colorAttributeMap = {
    'type': 'Makerspace Type',
    'out_of_school': 'Out of School'
  };

  colorMappings = {
    'type': [
      { label: 'After-school clubs and activities', color: 'rgb(255, 0, 102, 0.7)' },
      { label: 'Museum', color: 'rgba(51, 153, 255, 0.7)' },
      { label: 'Library', color: 'rgba(255, 153, 0, 0.7)' },
      { label: 'Mobile', color: 'rgba(102, 102, 153,0.7)' },
      { label: 'School', color: 'rgba(102, 0, 102, 0.7)' },
      { label: 'Other', color: 'rgba(255, 204, 0, 0.7)'}
    ],
    'out_of_school': [
      { label: 'In School', color: 'green' },
      { label: 'Out of School', color: 'red' }
    ]
  };

  constructor() { }

  ngOnInit() {
    // this.nodeSizeLegendTitle = this.sizeAttributeMap[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('selectedSizeEncoding' in changes) {
      this.nodeSizeLegendTitle = this.sizeAttributeMap[changes.selectedSizeEncoding.currentValue];
      const maxNodeSize = Math.round(d3Array.max(mapData.features, (d) => Number(d.properties[changes.selectedSizeEncoding.currentValue])));
      const minNodeSize = Math.round(d3Array.min(mapData.features, (d) => Number(d.properties[changes.selectedSizeEncoding.currentValue])));
      const midNodeSize = Math.round((maxNodeSize + minNodeSize) / 2);
      this.maxNodeSizeLabel = isNaN(maxNodeSize) ? '' : maxNodeSize.toString();
      this.midNodeSizeLabel = isNaN(midNodeSize) ? '' : midNodeSize.toString();
      this.minNodeSizeLabel = isNaN(minNodeSize) ? '' : minNodeSize.toString();
      this.updateNodesInLegend(maxNodeSize, midNodeSize, minNodeSize);
    }
    if ('selectedColorEncoding' in changes) {
      this.colorMappingSelected = changes.selectedColorEncoding.currentValue;
    }
  }

  updateNodesInLegend(maxNodeSize: any, midNodeSize: any, minNodeSize: any) {
    let nodeSizeScale: any;
    if (!isNaN(maxNodeSize)) {
      nodeSizeScale = d3Scale.scaleLinear()
      .domain([0, maxNodeSize])
      .range(this.nodeSizeRange);
    } else {
      nodeSizeScale = d3Scale.scaleLinear()
      .domain([0, 0])
      .range(this.nodeSizeRange);
    }
    d3Selection.select('#maxNode').transition().attr('r', nodeSizeScale(maxNodeSize));
    d3Selection.select('#midNode').transition().attr('r', nodeSizeScale(midNodeSize));
    d3Selection.select('#minNode').transition().attr('r', nodeSizeScale(minNodeSize));
  }
}
