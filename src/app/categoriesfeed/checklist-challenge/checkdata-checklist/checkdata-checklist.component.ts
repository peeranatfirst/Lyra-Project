import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

import { TaskManageService } from "app/services/task-manage.service";

@Component({
  selector: 'app-checkdata-checklist',
  templateUrl: './checkdata-checklist.component.html',
  styleUrls: ['./checkdata-checklist.component.css']
})
export class CheckdataChecklistComponent implements OnInit {

  id: any;
  checklistChaDetail:any;
  tasks: any;

  challengeName: any;
  challengeDescription: any;
  duration: any;


  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private taskManage: TaskManageService) { }

  ngOnInit() {
     // Get id
     this.id = this.route.snapshot.params['id'];
     this.firebaseService.getChecklistChallengeDetails(this.id).subscribe(checklistDetail =>{
       this.checklistChaDetail = checklistDetail ;
     });

     this.firebaseService.getTasksOfChecklistChallenge(this.id).subscribe(tasks =>{
      this.tasks = tasks;
     });
  }

  onAddSubmit(){
    const uid = firebase.auth().currentUser.uid;
    const status = "processing";
    const start = firebase.database.ServerValue.TIMESTAMP;
    const per = "0";

    const checklistdetail = {
      challengeName: this.checklistChaDetail.challengeName,
      challengeDescription: this.checklistChaDetail.challengeDescription,
      challengeStatus: status,
      duration: this.checklistChaDetail.duration,
      taskAmount: this.checklistChaDetail.taskAmount,
      startDate : start,
      path : this.checklistChaDetail.path,
      secondOwner : uid,
      category : this.checklistChaDetail.category,
      percent : per
    };

    const checklistdetailNoDesc = {
      challengeName: this.checklistChaDetail.challengeName,
      challengeStatus: status,
      duration: this.checklistChaDetail.duration,
      taskAmount: this.checklistChaDetail.taskAmount,
      startDate : start,
      path : this.checklistChaDetail.path,
      secondOwner : uid,
      category : this.checklistChaDetail.category,
      percent : per
    };

    if (this.checklistChaDetail.challengeDescription === undefined) {
      this.taskManage.addChecklistChallengeDetail(checklistdetailNoDesc,this.tasks, uid);
    } else {
      this.taskManage.addChecklistChallengeDetail(checklistdetail,this.tasks, uid);
    }
    this.router.navigate(['/mychallenge']);
  }

}
