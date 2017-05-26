import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class DatetimestampService {

  constructor() { }

  getDatestamp(value){
        const date = new Date(value);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const monthNames = [
      "JAN", "FAB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
        return day+" "+monthNames[month]+" "+year;
  }

  getTimestamp(value){
    const time = new Date(value);
    const hour = time.getHours();
    const mins = time.getMinutes();
    if(mins<10){
     return hour+" : 0"+mins;
    }else{
      return hour+":"+mins;
    }
    
  }
}
