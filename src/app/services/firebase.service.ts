import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  challengeList: FirebaseListObservable<any[]>;
  challengeDetail: FirebaseObjectObservable<any>;
  checkdata: FirebaseObjectObservable<any>;
  myChallenges: FirebaseListObservable<any[]>;
  folder:any;

  constructor(private af: AngularFire) {
      this.folder = 'listingimages';
  }

  getChallengeList() {
    this.challengeList = this.af.database.list('/Categories /SavingMoney') as FirebaseListObservable<challengeList[]>
    return this.challengeList;
  }
 getChallengeDetail(id) {
    this.challengeDetail = this.af.database.object('/Categories /SavingMoney/'+id) as FirebaseObjectObservable<challengeList>
    return this.challengeDetail;
  }
  getChallengeMoneyData(id){
    this.checkdata = this.af.database.object('/Categories /SavingMoney/'+id) as FirebaseObjectObservable<challengeList>
    return this.checkdata;
  }

  getMyChallenges(){
    this.myChallenges = this.af.database.list('/users/userid1/Challenges') as FirebaseListObservable<myChallengesList[]>
    return this.myChallenges;
  }

  addSavingmoneydetailChallenges(savingmoneydetail){
    return this.myChallenges.push(savingmoneydetail);
    }

  }



interface challengeList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  duration?:string;
  totalAmount?:string;
}
interface myChallengesList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  challengeStatus?: string;
  duration?: string;
  totalAmount?: string;
}

