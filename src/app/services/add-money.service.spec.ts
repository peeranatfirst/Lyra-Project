import { TestBed, inject } from '@angular/core/testing';

import { AddMoneyService } from './add-money.service';

describe('AddMoneyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddMoneyService]
    });
  });

  it('should ...', inject([AddMoneyService], (service: AddMoneyService) => {
    expect(service).toBeTruthy();
  }));
});
