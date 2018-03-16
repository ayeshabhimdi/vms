import { TestBed, inject } from '@angular/core/testing';

import { DataPreprocessorService } from './data-preprocessor.service';

describe('DataPreprocessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataPreprocessorService]
    });
  });

  it('should be created', inject([DataPreprocessorService], (service: DataPreprocessorService) => {
    expect(service).toBeTruthy();
  }));
});
