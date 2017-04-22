import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {
  challengeList: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {

   }

   getChallengeList(){
     this.challengeList= this.af.database.list('/Categories /SavingMoney') as FirebaseListObservable<challengeList[]>
     return this.challengeList;
   }

}

interface challengeList{
  $key:string;
  challengeName?:string;
  challengeDescription?:string;
}

