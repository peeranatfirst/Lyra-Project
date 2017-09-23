import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

import { TaskManageService } from "app/services/task-manage.service";

@Component({
  selector: 'app-checkdata-step',
  templateUrl: './checkdata-step.component.html',
  styleUrls: ['./checkdata-step.component.css']
})
export class CheckdataStepComponent implements OnInit {

  id: any;
  stepChaDetail:any;
  steps: any;

  challengeName: any;
  challengeDescription: any;
  duration: any;

  constructor(private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private taskManage: TaskManageService) { }

  ngOnInit() {
    // Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getChecklistChallengeDetails(this.id).subscribe(stepDetail =>{
      this.stepChaDetail = stepDetail ;
    });

    this.firebaseService.getStepsOfStepChallenge(this.id).subscribe(steps =>{
      this.steps = steps;
    });
  }

  onAddSubmit(){
    const uid = firebase.auth().currentUser.uid;
    const status = "processing";
    const start = firebase.database.ServerValue.TIMESTAMP;
    const per = "0";

    const stepdetail = {
      challengeName: this.stepChaDetail.challengeName,
      challengeDescription: this.stepChaDetail.challengeDescription,
      challengeStatus: status,
      duration: this.stepChaDetail.duration,
      stepAmount: this.stepChaDetail.stepAmount,
      startDate : start,
      path : this.stepChaDetail.path,
      secondOwner : uid,
      category : this.stepChaDetail.category,
      percent : per
    };

    const stepdetailNoDesc = {
      challengeName: this.stepChaDetail.challengeName,
      challengeStatus: status,
      duration: this.stepChaDetail.duration,
      stepAmount: this.stepChaDetail.stepAmount,
      startDate : start,
      path : this.stepChaDetail.path,
      secondOwner : uid,
      category : this.stepChaDetail.category,
      percent : per
    };

    if (this.stepChaDetail.challengeDescription === undefined) {
      this.taskManage.addStepChallengeDetail(stepdetailNoDesc,this.steps, uid);
    } else {
      this.taskManage.addStepChallengeDetail(stepdetail,this.steps, uid);
    }
    this.router.navigate(['/mychallenge']);
  }

}
