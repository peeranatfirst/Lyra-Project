import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';

import { GetUserInfoService } from "app/services/get-user-info.service";

@Component({
  selector: 'app-step-challenge',
  templateUrl: './step-challenge.component.html',
  styleUrls: ['./step-challenge.component.css']
})
export class StepChallengeComponent implements OnInit {

  listOfChallenge: any[]; // collecting Array of Object to show in feeds page

  constructor(private firebaseService: FirebaseService,
  private dt: DatetimestampService) { }

  ngOnInit() {
    this.listOfChallenge = new Array();
    let imgPath;

    this.firebaseService.getChallengeList().subscribe(challengeList => {

      let key, name, des, duration, path, datestamp, timestamp, category, totalStep;

      for (const addObj of challengeList) {
        path = this.firebaseService.getListOfChallengePath(addObj);
        category = this.firebaseService.getListOfChallengeCategory(addObj);
        if (category === "Step") {
          const storage = firebase.storage();
          const pathRef = storage.ref();
          const promise = new Promise((resolve, reject) => {
            resolve(pathRef.child(path).getDownloadURL());
          });
          promise.then((res) => {
            imgPath = res;
            return imgPath;
          }).then((res) => {
            key = this.firebaseService.getListOfChallengeId(addObj);
            name = this.firebaseService.getListOfChallengeName(addObj);
            des = this.firebaseService.getListOfChallengeDes(addObj);
            duration = this.firebaseService.getListOfChallengeDuration(addObj);
            const datetimestamp = this.firebaseService.getListOfChallengeTimestamp(addObj);
            totalStep = this.firebaseService.getStepAmountOfChallenge(addObj);
            datestamp = this.dt.getDatestamp(datetimestamp);
            timestamp = this.dt.getTimestamp(datetimestamp);
            this.listOfChallenge.push({ chaId: key, chaName: name, description: des, time: duration, imgSRC: imgPath, thisTime: timestamp, thisDay: datestamp, stepAmount: totalStep });
          });
        }

      }

    });
  }

}
