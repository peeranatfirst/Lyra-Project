import { TestBed, inject } from '@angular/core/testing';

import { CreateSmChallengesService } from './create-challenges.service';

describe('CreateSmChallengesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateSmChallengesService]
    });
  });

  it('should ...', inject([CreateSmChallengesService], (service: CreateSmChallengesService) => {
    expect(service).toBeTruthy();
  }));
});
