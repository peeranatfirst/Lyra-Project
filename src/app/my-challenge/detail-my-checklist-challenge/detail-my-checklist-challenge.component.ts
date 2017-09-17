import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { DatetimestampService } from 'app/services/datetimestamp.service';
import * as firebase from 'firebase';
import { CalculatePercentSuccessService } from 'app/services/calculate-percent-success.service';
import { routing } from '../../app.routing';
import { FirebaseService } from "app/services/firebase.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaskManageService } from "app/services/task-manage.service";

@Component({
  selector: 'app-detail-my-checklist-challenge',
  templateUrl: './detail-my-checklist-challenge.component.html',
  styleUrls: ['./detail-my-checklist-challenge.component.css']
})
export class DetailMyChecklistChallengeComponent implements OnInit {

  id: any;
  uid: any;
  detailMyChallenge: any;
  startDate: any;
  imgURL: any;
  percent: any;

  tasks: any;
  myTasks: any[];

  constructor(private location: Location,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private calculate :CalculatePercentSuccessService,
    private taskmanage: TaskManageService) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    this.uid = firebase.auth().currentUser.uid;

    this.firebaseService.getDetailMyCLChallenge(this.uid,this.id).subscribe(detailMyChallenge =>{
      this.detailMyChallenge = detailMyChallenge;
      this.startDate = this.dt.getDatestamp(this.detailMyChallenge.startDate); // convert timestamp to date
      this.getImgURL(this.detailMyChallenge.path);
      this.percent = this.detailMyChallenge.percent;
      if (this.percent > 100) {
        this.percent = 100;
      }

      

    })

    this.firebaseService.getTasksOfMyChecklistChallenge(this.uid,this.id).subscribe(detailTasks =>{
      this.tasks = detailTasks;
      console.log(this.tasks);
      this.myTasks = new Array();
      this.tasks.forEach(element => {
        this.myTasks.push({ key: element.$key, tName: element.taskName, lev: element.level, tStatus: element.taskStatus });
      });
    })
  }

  onBack(){
    this.location.back();
  }

  getImgURL(path){
    const storage = firebase.storage();
    const pathRef = storage.ref().child(path).getDownloadURL().then((val)=>{
      this.imgURL=val;
    });
 }

}
