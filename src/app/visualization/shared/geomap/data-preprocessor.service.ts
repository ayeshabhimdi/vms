import { Injectable } from '@angular/core';
import * as mapData from './data_usa_all.json';

@Injectable()
export class DataPreprocessorService {
  processedData = mapData;

  constructor() { }
}
