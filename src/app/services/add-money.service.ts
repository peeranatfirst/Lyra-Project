import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseService } from "app/services/firebase.service";


@Injectable()

export class AddMoneyService {


  myChallenges: FirebaseListObservable<any[]>;
  balance: FirebaseListObservable<any[]>;

  constructor(private fs: FirebaseService) { }
  getTodayDate(){
    let datetime = new Date();
    let monthNames = [
      "JAN","FAB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"
    ];
    let date = datetime.getDate();
    let monthIndex = datetime.getMonth();
    let year = datetime.getFullYear();
    let today = monthNames[monthIndex]+" "+date+" "+year;

    return today;
  }

  getCurrentTime(){
    let datetime = new Date();

    let hours = datetime.getHours();
    let mins = datetime.getMinutes();

    let time = hours+" : "+mins;
    return time;
  }

   addSavingmoneydetailChallenges(savingmoneydetail) {
      firebase.database().ref('/users/userid1/Challenges').push(savingmoneydetail);
   }
   addMoney(addmoney,id) {
    let today = this.getTodayDate() ;

     firebase.database().ref('/users/userid1/Challenges/'+id+'/savingTransaction').push({
       balance:addmoney,
       datetimestamp:today
     });

  }



}

