import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {
  challengeList: FirebaseListObservable<any[]>;
  challengeDetail: FirebaseObjectObservable<any>;
  myChallenges: FirebaseListObservable<any[]>;
  balance: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {

  }

  getChallengeList() {
    this.challengeList = this.af.database.list('/Categories /SavingMoney') as FirebaseListObservable<challengeList[]>
    return this.challengeList;
  }
 getChallengeDetail(id) {
    this.challengeDetail = this.af.database.object('/Categories /SavingMoney/'+id) as FirebaseObjectObservable<challengeList>
    return this.challengeDetail;

  }

  getMyChallenges(){
    this.myChallenges = this.af.database.list('/users/userid1/Challenges') as FirebaseListObservable<myChallengesList[]>
    return this.myChallenges;
  }

  getTransaction(key){
    this.balance = this.af.database.list('/users/userid1/Challenges/'+key+'/savingTransaction') as FirebaseListObservable<myBalance[]>
    return this.balance;
  }

  getKeyOfChallenge(challengeslist: myChallengesList){
    return challengeslist.$key;
  }

  getNameOfChallenge(challengeslist: myChallengesList){
    return challengeslist.challengeName;
  }

  getDesOfChallenge(challengeslist: myChallengesList){
    return challengeslist.challengeDescription;
  }

  getTotalOfChallenge(challengeslist: myChallengesList){
    return challengeslist.totalAmount;
  }

  getTransactionBalance(transactionBalance : myBalance){
    return transactionBalance.balance;
  }

    calculateProgressPercent(sum,total){
    let percent;
    percent = (100*sum)/total;
    return percent;
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
  totalAmount?: number;
}

interface myBalance {
  $key?: string;
  datetimestamp?: string;
  balance?: number;
}


