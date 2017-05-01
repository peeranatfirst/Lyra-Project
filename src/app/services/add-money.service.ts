import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseService } from "app/services/firebase.service";

@Injectable()
export class AddMoneyService {

  myChallenges: FirebaseListObservable<any[]>;
  balance: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { }

   addSavingmoneydetailChallenges(savingmoneydetail) {
    return this.myChallenges.push(savingmoneydetail);
  }
   addMoney(addmoney,id) {
  
    
    let datetime = new Date();
    let monthNames = [
      "JAN","FAB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"
    ];
    let date = datetime.getDate();
    let monthIndex = datetime.getMonth();
    let year = datetime.getFullYear();
    let today = monthNames[monthIndex]+" "+date+" "+year;

     firebase.database().ref('/users/userid1/Challenges/'+id+'/savingTransaction').push({
       balance:addmoney,
       datetimestamp:today
     })
  }



}

