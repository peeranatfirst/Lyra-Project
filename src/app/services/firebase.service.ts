import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {
  challengeList: FirebaseListObservable<any[]>;
  challengeDetail: FirebaseObjectObservable<any>;
  myChallenges: FirebaseListObservable<any[]>;
  detailMyChallenge: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) {

  }

  getChallengeList() {
    this.challengeList = this.af.database.list('/Categories /SavingMoney') as FirebaseListObservable<challengeList[]>
    return this.challengeList;
  }
  getChallengeDetail(id) {
    this.challengeDetail = this.af.database.object('/Categories /SavingMoney/' + id) as FirebaseObjectObservable<challengeList>
    return this.challengeDetail;
  }

  getMyChallenges() {
    this.myChallenges = this.af.database.list('/users/userid1/Challenges') as FirebaseListObservable<myChallengesList[]>
    return this.myChallenges;
  }

  getDetailMyChallenge(id) {
    this.detailMyChallenge = this.af.database.object('/users/userid1/Challenges/' + id) as FirebaseObjectObservable<myChallengesList>
    return this.detailMyChallenge;
  }

}

interface challengeList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  duration?: string;
  totalAmount?: string;
}
interface myChallengesList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  challengeStatus?: string;
  duration?: string;
  totalAmount?: string;
}

