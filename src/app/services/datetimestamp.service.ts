import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class DatetimestampService {

  constructor() { }

  getDatestamp(value){
        let date = new Date(value);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let monthNames = [
      "JAN", "FAB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
        return day+" "+monthNames[month]+" "+year;
  }

  getTimestamp(value){
    let time = new Date(value);
    let hour = time.getHours();
    let mins = time.getMinutes();
    if(mins<10){
     return hour+" : 0"+mins;
    }else{
      return hour+":"+mins;
    }
    
  }
}
