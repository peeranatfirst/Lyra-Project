import { TestBed, inject } from '@angular/core/testing';

import { CalculatePercentSuccessService } from './calculate-percent-success.service';

describe('CalculatePercentSuccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatePercentSuccessService]
    });
  });

  it('should ...', inject([CalculatePercentSuccessService], (service: CalculatePercentSuccessService) => {
    expect(service).toBeTruthy();
  }));
});
