import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { AngularFire } from 'angularfire2';
import { routing } from '../../../app.routing';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { CreateChallengesService } from "app/services/create-challenges.service";


@Component({
  selector: 'app-create-task-step',
  templateUrl: './create-task-step.component.html',
  styleUrls: ['./create-task-step.component.css']
})
export class CreateTaskStepComponent implements OnInit {

  id: any;
  checklistDetails: any;
  imageUrl: any;
  stepCha: any;
  hasTask: any;

  stepForAdd: any[];
  totalTaskAmount = 0;

  stepCounter = 0;

  constructor(private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private userinfo: GetUserInfoService,
    private cc: CreateChallengesService) { }

  ngOnInit() {
    // Get id
    this.id = this.route.snapshot.params['id'];

     this.firebaseService.getChecklistChallengeDetails(this.id).subscribe((checklistDetails) => {
       this.checklistDetails = checklistDetails;
     });

    this.stepForAdd = new Array();
  }

  onAddSubmit(formData) {
    if (formData.value) {
      const stepName = formData.value.stepName;
      const stepDes = formData.value.stepDes;
      this.stepCounter++;
      if (stepDes == undefined || stepDes == '') {
        this.stepForAdd.push({
          stepNo: this.stepCounter,
          stepName: stepName,
          stepDes: "undefined"
        });
      }else{
        this.stepForAdd.push({
          stepNo: this.stepCounter,
          stepName: stepName,
          stepDes: stepDes
        });
      }
      formData.reset();
    }
  }

  onAddTask() {
    if (this.stepForAdd[0] !== undefined) {
      console.log("add to database");
      var ref = firebase.database().ref("/AllChallenge" + this.id);
      ref.once("value")
        .then(function (snapshot) {
          var hasTask = snapshot.hasChild("steps");
        }).then((hasTask) => {
          for (var i = 0; i < this.stepForAdd.length; i++) {
            const obj = {
              stepNo: this.stepForAdd[i].stepNo,
              stepName: this.stepForAdd[i].stepName,
              stepDes: this.stepForAdd[i].stepDes
            };
            this.cc.addTasksStepChallenge(obj, this.id);
          }
        }).then(() => {
          firebase.database().ref('AllChallenge/' + this.id).child('stepAmount').set(this.stepCounter);
        }).then(() => {
          this.router.navigate(['detailStep/' + this.id]);
        });

    } else {
      console.log("nothing to add");

    }
  }


}
