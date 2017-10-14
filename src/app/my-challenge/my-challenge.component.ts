import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CalculatePercentSuccessService } from 'app/services/calculate-percent-success.service';
import * as firebase from 'firebase';
import $ from 'jquery';



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

    $(document).ready(function () {
      $('#Doing-tab').addClass('active');

      $("#Doing-tab").click(function () {
        $('#Doing-tab').addClass('active');
        $('#Achieved-tab').removeClass('active');
        $('#Cancelled-tab').removeClass('active');
        $('#All-tab').removeClass('active');
        $('#Doing').addClass('fadeIn');
        document.getElementById('Doing').style.display = "";
        document.getElementById('Achieved').style.display = "none";
        document.getElementById('Cancelled').style.display = "none";
        document.getElementById('All').style.display = "none";
      });

      $("#Achieved-tab").click(function () {
        $('#Doing-tab').removeClass('active');
        $('#Achieved-tab').addClass('active');
        $('#Cancelled-tab').removeClass('active');
        $('#All-tab').removeClass('active');
        $('#Achieved').addClass('fadeIn');
        document.getElementById('Doing').style.display = "none";
        document.getElementById('Achieved').style.display = "";
        document.getElementById('Cancelled').style.display = "none";
        document.getElementById('All').style.display = "none";
      });

      $("#Cancelled-tab").click(function () {
        $('#Doing-tab').removeClass('active');
        $('#Achieved-tab').removeClass('active');
        $('#Cancelled-tab').addClass('active');
        $('#All-tab').removeClass('active');
        $('#Cancelled').addClass('fadeIn');
        document.getElementById('Doing').style.display = "none";
        document.getElementById('Achieved').style.display = "none";
        document.getElementById('Cancelled').style.display = "";
        document.getElementById('All').style.display = "none";
      });

      $("#All-tab").click(function () {
        $('#Doing-tab').removeClass('active');
        $('#Achieved-tab').removeClass('active');
        $('#Cancelled-tab').removeClass('active');
        $('#All-tab').addClass('active');
        $('#All').addClass('fadeIn');
        document.getElementById('Doing').style.display = "none";
        document.getElementById('Achieved').style.display = "none";
        document.getElementById('Cancelled').style.display = "none";
        document.getElementById('All').style.display = "";
      });
    });

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
        let pullKey, pullName, pullTotal, progress, pullStatus , currentMoney ,startDate, pullPercent, category;

        pullKey = this.firebaseService.getKeyOfChallenge(obj);
        pullName = this.firebaseService.getNameOfChallenge(obj);
        pullStatus = this.firebaseService.getStatusOfChallenge(obj);
        startDate = this.firebaseService.getStartDateOfChallenge(obj);
        category = this.firebaseService.getCategoryOfChallenge(obj);
        // Saving Money Challenge
        if(category === "SavingMoney"){
          pullTotal = this.firebaseService.getTotalOfChallenge(obj);
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
            this.DetailOfChallenges.push({ name: pullName, percent: progress, myk: pullKey, status: pullStatus , start: startDate ,cate : category });
            if(pullStatus==='processing'){
              this.inProgressChallenges.push({ name: pullName, percent: progress,  myk: pullKey, status: pullStatus , start: startDate ,cate : category  });
            }else if(pullStatus==='Achieved'){
              this.achievedChallenges.push({ name: pullName,  percent: progress, myk: pullKey, status: pullStatus , start: startDate ,cate : category});
            }else{
              this.cancelledChallenges.push({ name: pullName,  percent: progress,  myk: pullKey, status: pullStatus , start: startDate ,cate : category });
            }
            

          });
        }else{
            // Checklist Challenge
            progress = this.firebaseService.getPercentOfChallenge(obj);
            if(progress>100){
              progress = 100;
            }
            this.DetailOfChallenges.push({ name: pullName, percent: progress, myk: pullKey, status: pullStatus , start: startDate ,cate : category });
            if(pullStatus==='processing'){
              this.inProgressChallenges.push({ name: pullName, percent: progress,  myk: pullKey, status: pullStatus , start: startDate ,cate : category  });
            }else if(pullStatus==='Achieved'){
              this.achievedChallenges.push({ name: pullName,  percent: progress, myk: pullKey, status: pullStatus , start: startDate ,cate : category});
            }else{
              this.cancelledChallenges.push({ name: pullName,  percent: progress,  myk: pullKey, status: pullStatus , start: startDate ,cate : category });
            }
        }
        
        

        
        

      }
      // console.log(this.achievedChallenges);
    });
  }
}
