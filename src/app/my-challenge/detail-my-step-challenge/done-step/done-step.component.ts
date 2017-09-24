import { Component, OnInit } from '@angular/core';
import { AddMoneyService } from 'app/services/add-money.service';
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from 'app/services/firebase.service';
import * as firebase from 'firebase';
import $ from 'jquery';
import { Location } from "@angular/common";
import { TaskManageService } from "app/services/task-manage.service";
import { CalculatePercentSuccessService } from "app/services/calculate-percent-success.service";

@Component({
  selector: 'app-done-step',
  templateUrl: './done-step.component.html',
  styleUrls: ['./done-step.component.css']
})
export class DoneStepComponent implements OnInit {

  stepCaption: any;
  image: any;
  chaId: any;
  stepId: any;
  uid: any;

  detailStep: any;
  steps: any;
  stepNumber: any;

  constructor(private location: Location,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private taskmanage: TaskManageService,
    private calPercent: CalculatePercentSuccessService) { }

  ngOnInit() {

    $(document).ready(function () {
      $('.blockloadergrey').hide();
      $('.blockloaderwhite').hide();
      $('#check').click(function(){
        $('.blockloadergrey').show();
        $('.blockloaderwhite').show();
        $('.blockloaderwhite').addClass('animated zoomIn');
      })
    });

     // Get ID
     this.chaId = this.route.snapshot.params['id1'];
     this.stepId = this.route.snapshot.params['id2'];
     this.uid = firebase.auth().currentUser.uid;
 
     this.firebaseService.getStepsDetail(this.uid,this.chaId,this.stepId).subscribe(detailStep =>{
       this.detailStep = detailStep;
       this.stepNumber = this.firebaseService.getStepNumber(detailStep);
     });
 
     this.firebaseService.getStepsOfMyStepChallenge(this.uid,this.chaId).subscribe(steps =>{
       this.steps = steps;
     })
     
  }

  onCheckSubmit(){
    var hasImg = (<HTMLInputElement>document.getElementById("image")).value; 
    let stamp = firebase.database.ServerValue.TIMESTAMP;
    const stepNum = this.stepNumber+1;
    if(hasImg != ""){
      if(this.stepCaption == undefined || this.stepCaption == ""){
        // console.log("image with no caption");
        const cap = {
          stepStatus: "checked",
          datetimeStamp: stamp
        }
        this.taskmanage.checkStepWithImage(this.uid,this.chaId,this.stepId, cap);
      }else{
        // console.log("image with caption");
        const cap = {
          stepStatus: "checked",
          caption: this.stepCaption,
          datetimeStamp: stamp
        }
        this.taskmanage.checkStepWithImage(this.uid,this.chaId,this.stepId, cap);
      }
    }else{
      if(this.stepCaption == undefined || this.stepCaption == ""){
        // console.log("no image with no caption");
        this.taskmanage.checkStep(this.uid,this.chaId,this.stepId);
      }else{
        // console.log("no image with caption");
        this.taskmanage.checkStepWithCaptionNoImage(this.uid,this.chaId,this.stepId,this.stepCaption);
        
      }
    }
    this.taskmanage.unlockStep(this.uid, this.chaId, stepNum);
    new Promise(function (resolve, reject) {
      setTimeout(() => resolve(), 2500);
    }).then(()=>{
      this.calculateSTProgressPercent();
    }).then(()=>{
      this.router.navigate(['/detailmyStepchallenge/'+this.chaId]);
    })

    
  }

  onBack(){
    this.location.back();
  }

  calculateSTProgressPercent(){
    let sumChecked = 0, sumTotal =0;
    this.steps.forEach(element => {  
      sumTotal = sumTotal+1;
      if(element.stepStatus == "checked"){
        sumChecked = sumChecked+1;
      }
    });

    let percent = (sumChecked*100)/sumTotal;
    console.log(percent);
    if(percent >= 100){
      percent=100;
      this.updateProgressPercent(percent);
      this.achieveChallenge();
    }else{
      this.updateProgressPercent(percent);
    }
  }

  achieveChallenge(){
    const status = {
      challengeStatus: "Achieved"
    }
    firebase.database().ref('/users/'+this.uid+'/Challenges/'+this.chaId).update(status);
  }

  updateProgressPercent(num){
    const status = {
      percent: num
    }
    firebase.database().ref('/users/'+this.uid+'/Challenges/'+this.chaId).update(status);
  }

}
