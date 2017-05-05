import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  challengeList: FirebaseListObservable<any[]>;
  challengeDetail: FirebaseObjectObservable<any>;
  checkdata: FirebaseObjectObservable<any>;
  myChallenges: FirebaseListObservable<any[]>;
  detailMyChallenge: FirebaseObjectObservable<any>;
  balance: FirebaseListObservable<any[]>;
  folder: any;
  detailBalance: FirebaseListObservable<any[]>;


  constructor(private af: AngularFire) {
    this.folder = 'savingmoneychallenges';
  }

  getChallengeList() {
    this.challengeList = this.af.database.list('/Categories /SavingMoney') as FirebaseListObservable<challengeList[]>
    return this.challengeList;
  }
  getChallengeDetail(id) {
    this.challengeDetail = this.af.database.object('/Categories /SavingMoney/' + id) as FirebaseObjectObservable<challengeList>
    return this.challengeDetail;
  }
  getChallengeMoneyData(id) {
    this.checkdata = this.af.database.object('/Categories /SavingMoney/' + id) as FirebaseObjectObservable<challengeList>
    return this.checkdata;
  }

  getMyChallenges() {
    this.myChallenges = this.af.database.list('/users/userid1/Challenges') as FirebaseListObservable<myChallengesList[]>
    return this.myChallenges;
  }



  getDetailMyChallenge(id) {
    this.detailMyChallenge = this.af.database.object('/users/userid1/Challenges/' + id) as FirebaseObjectObservable<myChallengesList>
    return this.detailMyChallenge;
  }

  getTransaction(key) {
    this.balance = this.af.database.list('/users/userid1/Challenges/' + key + '/savingTransaction') as FirebaseListObservable<myBalance[]>
    return this.balance;
  }

  getKeyOfChallenge(challengeslist: myChallengesList) {
    return challengeslist.$key;
  }

  getNameOfChallenge(challengeslist: myChallengesList) {
    return challengeslist.challengeName;
  }

  getDesOfChallenge(challengeslist: myChallengesList) {
    return challengeslist.challengeDescription;
  }

  getTotalOfChallenge(challengeslist: myChallengesList) {
    return challengeslist.totalAmount;
  }
  getStatusOfChallenge(challengeslist: myChallengesList) {
    return challengeslist.challengeStatus;
  }

  getTransactionBalance(transactionBalance: myBalance) {
    return transactionBalance.balance;
  }

  calculateProgressPercent(sum, total) {
    let percent;
    percent = (100 * sum) / total;

    return percent;
  }

  addCreateSavingmoneyChallenge(createSavingmoneyChallenge) {
    let storageRef = firebase.storage().ref();
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        createSavingmoneyChallenge.image = selectedFile.name;
        createSavingmoneyChallenge.path = path;
        return this.challengeList.push(createSavingmoneyChallenge);
      });
    }
  }

  deleteMychallenge(id) {
    return this.myChallenges.remove(id);
  }

}

interface challengeList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  duration?: string;
  totalAmount?: string;
  image?: string;
}

interface myChallengesList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  challengeStatus?: string;
  duration?: string;
  totalAmount?: number;
  image?: string;
}

interface myBalance {
  $key?: string;
  datetimestamp?: string;
  balance?: number;
}


