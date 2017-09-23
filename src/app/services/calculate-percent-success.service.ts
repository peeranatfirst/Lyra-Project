import { Injectable } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";
import * as firebase from 'firebase' ;

@Injectable()
export class CalculatePercentSuccessService {

  constructor(private firebase: FirebaseService) { }
  // Calculate percent success for Saving Money challenges
  calculateSMProgressPercent(sum, total) {
    let percent;
    percent = (100 * sum) / total;

    return percent;
  }

  calculateCLProgressPercent(uid, chaId, tasks){
    let sumTotal = 0, sumChecked = 0;
    tasks.forEach(element => {  
      if(element.level == 'hard'){
        const hard = 3;
        sumTotal = sumTotal+hard;
        if(element.taskStatus == 'Checked'){
          sumChecked = sumChecked+(hard * 100);
        }else{
          sumChecked = sumChecked+(hard * 0);
        }

      }else if(element.level == 'medium'){
        const med = 2;
        sumTotal = sumTotal+med;
        if(element.taskStatus == 'Checked'){
          sumChecked = sumChecked+(med * 100);
        }else{
          sumChecked = sumChecked+(med * 0);
        }
      }else{
        const easy = 1;
        sumTotal = sumTotal+easy;
        if(element.taskStatus == 'Checked'){
          sumChecked = sumChecked+(easy * 100);
        }else{
          sumChecked = sumChecked+(easy * 0);
        }
      }

    });
      let percent = sumChecked/sumTotal;
      if(percent >= 100){
        percent=100;
        this.updateProgressPercent(uid,chaId,percent);
        this.achieveChallenge(uid,chaId);
      }else{
        this.updateProgressPercent(uid,chaId,percent);
      }
  }

  achieveChallenge(uid, chaId){
    const status = {
      challengeStatus: "Achieved"
    }
    firebase.database().ref('/users/'+uid+'/Challenges/'+chaId).update(status);
  }

  updateProgressPercent(uid, chaId, num){
    const status = {
      percent: num
    }
    firebase.database().ref('/users/'+uid+'/Challenges/'+chaId).update(status);
  }

 
}
