import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";
import { routing } from '../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProgressBarDirective } from "./progress-bar.directive";




@Component({
  selector: 'app-my-challenge',
  templateUrl: './my-challenge.component.html',
  styleUrls: ['./my-challenge.component.css']
})
export class MyChallengeComponent implements OnInit {

  myChallenges: any;
  DetailOfChallenges: any[];

  /*chaName:any;
  chaDescription:any;
  balance: any;
  totalAmount:any;*/

  constructor(
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    //เอา obj ของ challenges มาใส่ไว้ใน myChallenges
    this.firebaseService.getMyChallenges().subscribe(myChallenges => {
      //console.log(myChallenges);
      this.myChallenges = myChallenges;
      //ดึง key ของแต่ละอันออกมา
      this.DetailOfChallenges = new Array();

      for (let obj of myChallenges) {
        let pullKey, pullName, pullDes, pullTotal, calBalance, progress, pullStatus;

        pullKey = this.firebaseService.getKeyOfChallenge(obj);
        pullName = this.firebaseService.getNameOfChallenge(obj);
        pullDes = this.firebaseService.getDesOfChallenge(obj);
        pullTotal = this.firebaseService.getTotalOfChallenge(obj);
        pullStatus = this.firebaseService.getStatusOfChallenge(obj);
        this.firebaseService.getTransaction(pullKey).subscribe(toCal => {
          var sum = 0;
          for (let calB of toCal) {
            let balance = this.firebaseService.getTransactionBalance(calB);
            sum = sum + balance;
          }
          progress = this.firebaseService.calculateProgressPercent(sum, pullTotal);
          this.DetailOfChallenges.push({ name: pullName, des: pullDes, percent: progress, total: pullTotal, myk: pullKey, status: pullStatus });


        })

      }
      console.log(this.DetailOfChallenges);
    })
  }
}
