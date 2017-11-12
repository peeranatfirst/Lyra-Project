import { Component, OnInit } from '@angular/core';
import { AddMoneyService } from 'app/services/add-money.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseService } from 'app/services/firebase.service';

import $ from 'jquery';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

  uid: any;
  SavingMoney: any;
  Checklist: any;
  Step: any;
  Routine: any;

  constructor(private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.uid = firebase.auth().currentUser.uid;
    const query = firebase.database().ref("users/" +this.uid + "/achievement");
    query.once("value")
      .then((snapshot) => {
        this.SavingMoney = snapshot.val().SavingMoney;
        this.Checklist = snapshot.val().Checklist;
        this.Step = snapshot.val().Step;
        this.Routine = snapshot.val().Routine;
      });
  }

}
