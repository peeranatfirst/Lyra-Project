import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { CreateChallengesService } from 'app/services/create-challenges.service';
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-savingmoney-challenge',
  templateUrl: './create-savingmoney-challenge.component.html',
  styleUrls: ['./create-savingmoney-challenge.component.css']
})
export class CreateSavingmoneyChallengeComponent implements OnInit {
  challengeName: any;
  challengeDescription: any;
  duration: any;
  totalAmount: any;
  image: any;


  constructor(
    private createCha: CreateChallengesService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService
  ) { }

  ngOnInit() {
  }

  // Recieve an information from create challenge form when click submit. 
  onAddSubmit() {
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    const createSavingmoneyChallenge = {
      challengeName: this.challengeName,
      challengeDescription: this.challengeDescription,
      duration: this.duration,
      totalAmount: this.totalAmount,
      datetimestamp: timestamp,
      category: "SavingMoney",
      owner: firebase.auth().currentUser.uid
    };
     
    const createSavingmoneyChallengeNoDescrip = {
      challengeName: this.challengeName,
      duration: this.duration,
      totalAmount: this.totalAmount,
      datetimestamp: timestamp,
      category: "SavingMoney",
      owner: firebase.auth().currentUser.uid
    };

    if (this.challengeDescription === undefined) {
      this.createCha.addCreateSavingmoneyChallenge(createSavingmoneyChallengeNoDescrip);
    } else {
      this.createCha.addCreateSavingmoneyChallenge(createSavingmoneyChallenge);
    }


  }




}


