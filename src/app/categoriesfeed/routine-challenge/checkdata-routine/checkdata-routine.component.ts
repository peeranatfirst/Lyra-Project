import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

import { TaskManageService } from "app/services/task-manage.service";

@Component({
  selector: 'app-checkdata-routine',
  templateUrl: './checkdata-routine.component.html',
  styleUrls: ['./checkdata-routine.component.css']
})
export class CheckdataRoutineComponent implements OnInit {

  id: any;
  routineChaDetail:any;
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
    this.firebaseService.getChecklistChallengeDetails(this.id).subscribe(routineDetail =>{
      this.routineChaDetail = routineDetail ;
    });

    /*this.firebaseService.getStepsOfStepChallenge(this.id).subscribe(steps =>{
      this.steps = steps;
    });*/
  }

  onAddSubmit(){
    const uid = firebase.auth().currentUser.uid;
    const status = "processing";
    const start = firebase.database.ServerValue.TIMESTAMP;
    const per = "0";

    const routinedetail = {
      challengeName: this.routineChaDetail.challengeName,
      challengeDescription: this.routineChaDetail.challengeDescription,
      challengeStatus: status,
      duration: this.routineChaDetail.duration,
      startDate : start,
      path : this.routineChaDetail.path,
      secondOwner : uid,
      category : this.routineChaDetail.category,
      percent : per
    };

    const routinedetailNoDesc = {
      challengeName: this.routineChaDetail.challengeName,
      challengeStatus: status,
      duration: this.routineChaDetail.duration,
      startDate : start,
      path : this.routineChaDetail.path,
      secondOwner : uid,
      category : this.routineChaDetail.category,
      percent : per
    };

    if (this.routineChaDetail.challengeDescription === undefined) {
      this.taskManage.addRoutineChallengeDetail(routinedetailNoDesc,uid);
    } else {
      this.taskManage.addRoutineChallengeDetail(routinedetail,uid);
    }
    this.router.navigate(['/mychallenge']);
  }

}
