import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class FirebaseService {
  challengeList: FirebaseListObservable<any[]>;
  challengeDetail: FirebaseObjectObservable<any>;
  checklistChalengeDetail: FirebaseObjectObservable<any>;
  checkdata: FirebaseObjectObservable<any>;
  myChallenges: FirebaseListObservable<any[]>;
  detailMyChallenge: FirebaseObjectObservable<any>;
  balance: FirebaseListObservable<any[]>;
  detailBalance: FirebaseListObservable<any[]>;

  tasks: FirebaseListObservable<any[]>;
  mytasks: FirebaseListObservable<any[]>;

  detailMySMChallenge: FirebaseObjectObservable<any>;
  detailMyCLChallenge: FirebaseObjectObservable<any>;

  detailOfTask: FirebaseObjectObservable<any>;

  constructor(
    private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute) {
  }

  getChallengeList() {
    this.challengeList = this.af.database.list('/AllChallenge') as FirebaseListObservable<challengeList[]>;
    return this.challengeList;
  }

  // get new detail saving money challenge with owner info
  getChallengeDetails(id) {
    this.challengeDetail = this.af.database.object('/AllChallenge/' + id) as FirebaseObjectObservable<challengeList>;
    return this.challengeDetail;
  }

  // get new detail saving money challenge with owner info
  getChecklistChallengeDetails(id){
    this.checklistChalengeDetail = this.af.database.object('/AllChallenge/'+id) as FirebaseObjectObservable<checklistChallengeList>;
    return this.checklistChalengeDetail;
  }

  // Get my challenge list of User
  getMyChallenges(uid) {
    this.myChallenges = this.af.database.list('/users/'+uid+'/Challenges') as FirebaseListObservable<myChallengesList[]>;
    return this.myChallenges;
  }

 /* getDetailMyChallenge(id) {
    this.detailMyChallenge = this.af.database.object('/users/userid1/Challenges/' + id) as FirebaseObjectObservable<myChallengesList>;
    return this.detailMyChallenge;
  }*/

  // get details of My Saving Money Challenges
  getDetailMySMChallenge(uid, key){
    this.detailMySMChallenge = this.af.database.object('/users/'+uid+'/Challenges/'+key) as FirebaseObjectObservable<myChallengesList>;
    return this.detailMySMChallenge;
  }

  // get details of My Checklist Challenges
  getDetailMyCLChallenge(uid, key){
    this.detailMyCLChallenge = this.af.database.object('/users/'+uid+'/Challenges/'+key) as FirebaseObjectObservable<myChallengesList>;
    return this.detailMyCLChallenge;
  }

  // Get Saving Money Transaction of challenges
  getTransaction(uid, key) {
    this.balance = this.af.database.list('/users/'+uid+'/Challenges/' + key + '/savingTransaction') as FirebaseListObservable<myBalance[]>;
    return this.balance;
  }

  // get checklist challenge's task 
  getTasksOfChecklistChallenge(id){
    this.tasks = this.af.database.list('/AllChallenge/'+ id+'/tasks') as FirebaseListObservable<myTasks[]>;
    return this.tasks;
  }

  // get My Checklist challenge's task 
  getTasksOfMyChecklistChallenge(uid, key){
    this.mytasks = this.af.database.list('/users/'+uid+'/Challenges/'+ key +'/tasks' ) as FirebaseListObservable<myDoingTasks[]>;
    return this.mytasks;
  }

  // get My Checklist Task's Detail
  getTaskDetail(uid,chaKey,taskKey){
    this.detailOfTask = this.af.database.object('/users/'+uid+'/Challenges/'+chaKey+'/tasks/'+taskKey) as FirebaseObjectObservable<myDoingTasks[]>;
    return this.detailOfTask;
  }

  getTaskName(taskDetail: myDoingTasks){
    return taskDetail.taskName;
  }

  getTaskLevel(taskDetail: myDoingTasks){
    return taskDetail.level;
  }

  getTaskStatus(taskDetail: myDoingTasks){
    return taskDetail.taskStatus;
  }

  getTaskKey(taskDetail: myDoingTasks){
    return taskDetail.$key;
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

  getCategoryOfChallenge(challengeList: myChallengesList) {
    return challengeList.category;
  }

  getPercentOfChallenge(challengeList: myChallengesList) {
    return challengeList.percent;
  }

  getTaskAmountOfChallenge(challengeslist: checklistChallengeList){
    return challengeslist.taskAmount;
  }

  getStepAmountOfChallenge(challengeslist: stepChallengeList){
    return challengeslist.stepAmount;
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

interface checklistChallengeList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  duration?: string;
  path?: string;
  datetimestamp?: string;
  owner?: string;
  category?: string;
  taskAmount?: string;
}

interface stepChallengeList {
  $key?: string;
  challengeName?: string;
  challengeDescription?: string;
  duration?: string;
  path?: string;
  datetimestamp?: string;
  owner?: string;
  category?: string;
  stepAmount?: string;
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
  category?: string;
  percent?: string;
}

interface myBalance {
  $key?: string;
  datetimestamp?: string;
  balance?: number;
}

interface myTasks {
  $key?: string;
  taskName?: string;
  level?: string;
}

interface myDoingTasks {
  $key?: string;
  taskName?: string;
  level?: string;
  taskStatus?: string;
}


