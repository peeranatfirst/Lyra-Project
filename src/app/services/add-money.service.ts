import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseService } from "app/services/firebase.service";




@Injectable()

export class AddMoneyService {

  myChallenges: FirebaseListObservable<any[]>;
  balance: FirebaseListObservable<any[]>;

  constructor(private firebaseService: FirebaseService) { }


  addSavingmoneydetailChallenges(savingmoneydetail) {
    firebase.database().ref('/users/userid1/Challenges').push(savingmoneydetail);
  }
  
  calculateBalance(toCal){
    let sum= 0;
    for(let calBalance of toCal){
      let balance = this.firebaseService.getTransactionBalance(calBalance);
      sum = sum+balance;
    }
    return sum;
  }


  addMoney(addmoney, id) {
    let timestamp = firebase.database.ServerValue.TIMESTAMP;

    firebase.database().ref('/users/userid1/Challenges/' + id + '/savingTransaction').push({
      balance: addmoney,
      datetimestamp: timestamp
    });

  }

  achievedStatusUpdate(id) {
    var test = {
      challengeStatus: "Achieved"
    };
    firebase.database().ref('/users/userid1/Challenges/' + id).update(test);
  }

  deleteTransaction(key,tId){
    firebase.database().ref('/users/userid1/Challenges/'+key+'/savingTransaction/'+tId).remove();
  }

  deleteChallenge(id){
    firebase.database().ref('/users/userid1/Challenges/'+id).remove();
  }

}

