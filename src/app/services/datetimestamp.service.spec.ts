import { TestBed, inject } from '@angular/core/testing';

import { DatetimestampService } from './datetimestamp.service';

describe('DatetimestampService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatetimestampService]
    });
  });

  it('should ...', inject([DatetimestampService], (service: DatetimestampService) => {
    expect(service).toBeTruthy();
  }));
});
