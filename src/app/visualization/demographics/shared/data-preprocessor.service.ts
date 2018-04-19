import { Injectable } from '@angular/core';
import * as mapData from '../../shared/geomap/data_usa_all.json';

@Injectable()
export class DataPreprocessorService {
  processedData = mapData;

  constructor() { }
}
