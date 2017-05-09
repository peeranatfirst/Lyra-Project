import { Injectable } from '@angular/core';

@Injectable()
export class CalculatePercentSuccessService {

  constructor() { }
  //Calculate percent success for Saving Money challenges
  calculateSMProgressPercent(sum, total) {
    let percent;
    percent = (100 * sum) / total;

    return percent;
  }
}
