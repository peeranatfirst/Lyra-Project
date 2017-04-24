import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {
  challengeList: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any[]>;

  constructor(private af: AngularFire) {

  }

  getChallengeList() {
    this.challengeList = this.af.database.list('/Categories /SavingMoney') as FirebaseListObservable<challengeList[]>
    return this.challengeList;
  }
 getChallengeDetail(id) {
    this.listing = this.af.database.object('/Categories /SavingMoney'+id) as FirebaseObjectObservable<listing>
    return this.listing;
  }

}

interface challengeList {
  $key: string;
  challengeName?: string;
  challengeDescription?: string;
}
interface listing{
  
}

