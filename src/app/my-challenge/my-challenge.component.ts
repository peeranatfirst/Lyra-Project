import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CalculatePercentSuccessService } from 'app/services/calculate-percent-success.service';
import * as firebase from 'firebase';
// import { ProgressBarDirective } from "./progress-bar.directive";




@Component({
  selector: 'app-my-challenge',
  templateUrl: './my-challenge.component.html',
  styleUrls: ['./my-challenge.component.css']
})
export class MyChallengeComponent implements OnInit {

  myChallenges: any;
  DetailOfChallenges: any[];
  inProgressChallenges : any[];
  achievedChallenges :any[];
  cancelledChallenges : any[];

  constructor(
    private firebaseService: FirebaseService,
    private calculate : CalculatePercentSuccessService) { }

  ngOnInit() {
    // เอา obj ของ challenges มาใส่ไว้ใน myChallenges
    const uid = firebase.auth().currentUser.uid;
    this.firebaseService.getMyChallenges(uid).subscribe(myChallenges => {
      // console.log(myChallenges);
      this.myChallenges = myChallenges;
      // ดึง key ของแต่ละอันออกมา
      this.DetailOfChallenges = new Array(); // all challenges
      this.inProgressChallenges = new Array(); // processing
      this.achievedChallenges = new Array(); // achieved
      this.cancelledChallenges = new Array(); // cancelled
      const uid = firebase.auth().currentUser.uid;
      for (const obj of myChallenges) {
        let pullKey, pullName, pullDes, pullTotal, progress, pullStatus , currentMoney ,startDate;

        pullKey = this.firebaseService.getKeyOfChallenge(obj);
        pullName = this.firebaseService.getNameOfChallenge(obj);
        pullDes = this.firebaseService.getDesOfChallenge(obj);
        pullTotal = this.firebaseService.getTotalOfChallenge(obj);
        pullStatus = this.firebaseService.getStatusOfChallenge(obj);
        startDate = this.firebaseService.getStartDateOfChallenge(obj);
        this.firebaseService.getTransaction(uid, pullKey).subscribe(toCal => {
          let sum = 0;
          for (const calB of toCal) {
            const balance = this.firebaseService.getTransactionBalance(calB);
            sum = sum + balance;
          }
          currentMoney = sum;
          progress = this.calculate.calculateSMProgressPercent(sum, pullTotal);
          if(progress>100){
            progress = 100;
          }
          this.DetailOfChallenges.push({ name: pullName, des: pullDes, percent: progress, total: pullTotal, myk: pullKey, status: pullStatus ,balance: currentMoney, start: startDate });
          if(pullStatus==='processing'){
            this.inProgressChallenges.push({ name: pullName, des: pullDes, percent: progress, total: pullTotal, myk: pullKey, status: pullStatus ,balance: currentMoney, start: startDate  });
          }else if(pullStatus==='Achieved'){
            this.achievedChallenges.push({ name: pullName, des: pullDes, percent: progress, total: pullTotal, myk: pullKey, status: pullStatus ,balance: currentMoney , start: startDate });
          }else{
            this.cancelledChallenges.push({ name: pullName, des: pullDes, percent: progress, total: pullTotal, myk: pullKey, status: pullStatus ,balance: currentMoney , start: startDate });
          }

        });

      }
      // console.log(this.achievedChallenges);
    });
  }
}
