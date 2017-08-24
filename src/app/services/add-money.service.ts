import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseService } from 'app/services/firebase.service';




@Injectable()

export class AddMoneyService {

  myChallenges: FirebaseListObservable<any[]>;
  balance: FirebaseListObservable<any[]>;

  constructor(private firebaseService: FirebaseService) { }


  addSavingmoneydetailChallenges(savingmoneydetail, uid) {
    firebase.database().ref('/users/'+uid+'/Challenges').push(savingmoneydetail);
  }
  
  calculateBalance(toCal){
    let sum= 0;
    for(const calBalance of toCal){
      const balance = this.firebaseService.getTransactionBalance(calBalance);
      sum = sum+balance;
    }
    return sum;
  }


  addMoney(addmoney,uid, id) {
    const timestamp = firebase.database.ServerValue.TIMESTAMP;

    firebase.database().ref('/users/'+uid+'/Challenges/' + id + '/savingTransaction').push({
      balance: addmoney,
      datetimestamp: timestamp
    });

  }

  achievedStatusUpdate(uid,id) {
    const status = {
      challengeStatus: "Achieved"
    };
    firebase.database().ref('/users/'+uid+'/Challenges/' + id).update(status);
  }

  cancelChallengeUpdate(uid,id){
    const status = {
      challengeStatus: "Cancelled"
    };
    firebase.database().ref('/users/'+uid+'/Challenges/'+ id).update(status);
  }

  deleteTransaction(uid,key,tId){
    firebase.database().ref('/users/'+uid+'/Challenges/'+key+'/savingTransaction/'+tId).remove();
  }

  deleteChallenge(uid,id){
    firebase.database().ref('/users/'+uid+'/Challenges/'+id).remove();
  }

}

