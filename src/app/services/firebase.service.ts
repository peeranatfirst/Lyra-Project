import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class FirebaseService {
  challengeList: FirebaseListObservable<any[]>;
  challengeDetail: FirebaseObjectObservable<any>;
  checkdata: FirebaseObjectObservable<any>;
  myChallenges: FirebaseListObservable<any[]>;
  detailMyChallenge: FirebaseObjectObservable<any>;
  balance: FirebaseListObservable<any[]>;
  detailBalance: FirebaseListObservable<any[]>;

  detailMySMChallenge: FirebaseObjectObservable<any>;

  constructor(
    private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute) {
  }

  getChallengeList() {
    this.challengeList = this.af.database.list('/AllChallenge') as FirebaseListObservable<challengeList[]>;
    return this.challengeList;
  }

  // get new detail challenge with owner info
  getChallengeDetails(id) {
    this.challengeDetail = this.af.database.object('/AllChallenge/' + id) as FirebaseObjectObservable<challengeList>;
    return this.challengeDetail;
  }


  // Get my challenge list of User
  getMyChallenges(uid) {
    this.myChallenges = this.af.database.list('/users/'+uid+'/Challenges') as FirebaseListObservable<myChallengesList[]>;
    return this.myChallenges;
  }

  getDetailMyChallenge(id) {
    this.detailMyChallenge = this.af.database.object('/users/userid1/Challenges/' + id) as FirebaseObjectObservable<myChallengesList>;
    return this.detailMyChallenge;
  }

  // get details of My Saving Money Challenges
  getDetailMySMChallenge(uid, key){
    this.detailMySMChallenge = this.af.database.object('/users/'+uid+'/Challenges/'+key) as FirebaseObjectObservable<myChallengesList>;
    return this.detailMySMChallenge;
  }

  // Get Saving Money Transaction of challenges
  getTransaction(uid, key) {
    this.balance = this.af.database.list('/users/'+uid+'/Challenges/' + key + '/savingTransaction') as FirebaseListObservable<myBalance[]>;
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
  getStartDateOfChallenge(challengeList: myChallengesList) {
    return challengeList.startDate;
  }

  // Return balance
  getTransactionBalance(transactionBalance: myBalance) {
    return transactionBalance.balance;
  }

  // get challenge list (feed page)
  getListOfChallengeId(listOfChallenge: challengeList) {
    return listOfChallenge.$key;
  }
  getListOfChallengeName(listOfChallenge: challengeList) {
    return listOfChallenge.challengeName;
  }
  getListOfChallengeDes(listOfChallenge: challengeList) {
    return listOfChallenge.challengeDescription;
  }
  getListOfChallengeDuration(listOfChallenge: challengeList) {
    return listOfChallenge.duration;
  }
  getListOfChallengeGoal(listOfChallenge: challengeList) {
    return listOfChallenge.totalAmount;
  }
  getListOfChallengePath(listOfChallenge: challengeList) {
    return listOfChallenge.path;
  }
  getListOfChallengeTimestamp(listOfChallenge: challengeList) {
    return listOfChallenge.datetimestamp;
  }

  getListOfChallengeCategory(listOfChallenge: challengeList){
    return listOfChallenge.category;
  }

  getListOfOwnwer(listOfChallenge: challengeList){
    return listOfChallenge.owner;
  }
}

interface challengeList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  duration?: string;
  totalAmount?: string;
  path?: string;
  datetimestamp?: string;
  owner?: string;
  category?: string;
}

interface myChallengesList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  challengeStatus?: string;
  duration?: string;
  totalAmount?: number;
  image?: string;
  startDate?: string;
}

interface myBalance {
  $key?: string;
  datetimestamp?: string;
  balance?: number;
}


