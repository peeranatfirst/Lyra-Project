import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { DatetimestampService } from 'app/services/datetimestamp.service';
import * as firebase from 'firebase';
import { CalculatePercentSuccessService } from 'app/services/calculate-percent-success.service';
import { routing } from '../../app.routing';
import { FirebaseService } from "app/services/firebase.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaskManageService } from "app/services/task-manage.service";
import { AddMoneyService } from "app/services/add-money.service";

@Component({
  selector: 'app-detail-my-step-challenge',
  templateUrl: './detail-my-step-challenge.component.html',
  styleUrls: ['./detail-my-step-challenge.component.css']
})
export class DetailMyStepChallengeComponent implements OnInit {

  id: any;
  uid: any;
  detailMyChallenge: any;
  startDate: any;
  imgURL: any;
  percent: any;

  steps: any;
  mysteps: any[];

  totalStep: any;
  done: any;

  chaId: any;

  constructor(private location: Location,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private calculate: CalculatePercentSuccessService,
    private taskmanage: TaskManageService,
    private addmoney: AddMoneyService) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    this.uid = firebase.auth().currentUser.uid;

    this.firebaseService.getDetailMyCLChallenge(this.uid, this.id).subscribe(detailMyChallenge => {
      this.detailMyChallenge = detailMyChallenge;
      this.chaId = detailMyChallenge.$key;
      this.startDate = this.dt.getDatestamp(this.detailMyChallenge.startDate); // convert timestamp to date
      this.getImgURL(this.detailMyChallenge.path);
      this.percent = this.detailMyChallenge.percent;
    })

    this.firebaseService.getStepsOfMyStepChallenge(this.uid, this.id).subscribe(detailSteps => {
      this.steps = detailSteps;
      let checked = 0;
      this.mysteps = new Array();
      this.steps.forEach(element => {
        this.mysteps.push({ key: element.$key,sNo: element.stepNo, sName: element.stepName, sDes: element.stepDes, sStatus: element.stepStatus });
        if (element.taskStatus === "Checked") {
          checked = checked + 1;
        }
      });
      this.done = checked;
    })
  }

  onBack() {
    this.location.back();
  }

  getImgURL(path) {
    const storage = firebase.storage();
    const pathRef = storage.ref().child(path).getDownloadURL().then((val) => {
      this.imgURL = val;
    });
  }

  onCancelChallenge() {
    if (confirm("Are you sure to cancel " + this.detailMyChallenge.challengeName + " Challenge?")) {
      this.addmoney.cancelChallengeUpdate(this.uid, this.chaId);
      this.router.navigate(['/mychallenge']);
    }
  }

  onDeleteChallenge() {
    if (confirm("Are you sure to delete " + this.detailMyChallenge.challengeName + " Challenge?")) {
      this.addmoney.deleteChallenge(this.uid, this.chaId);
      this.router.navigate(['/mychallenge']);
    }
  }

}
