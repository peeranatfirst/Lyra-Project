import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { CreateChallengesService } from 'app/services/create-challenges.service';
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import * as firebase from 'firebase';
import $ from 'jquery';

@Component({
  selector: 'app-create-routine-challenge',
  templateUrl: './create-routine-challenge.component.html',
  styleUrls: ['./create-routine-challenge.component.css']
})
export class CreateRoutineChallengeComponent implements OnInit {

  challengeName: any;
  challengeDescription: any;
  duration: any;
  totalAmount: any;
  image: any;

  constructor(private createCha: CreateChallengesService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.blockloadergrey').hide();
      $('.blockloaderwhite').hide();
      $('#create').click(function () {
        $('.blockloadergrey').show();
        $('.blockloaderwhite').show();
        $('.blockloaderwhite').addClass('animated zoomIn');
        setTimeout(disableScroll(), 5000);
      })
    });
    function disableScroll(){
      $("body").css('overflow', 'hidden');
    }
  }

  // Recieve an information from create challenge form when click submit. 
  onAddSubmit() {
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    const createRoutineChallenge = {
      challengeName: this.challengeName,
      challengeDescription: this.challengeDescription,
      duration: this.duration,
      datetimestamp: timestamp,
      category: "Routine",
      owner: firebase.auth().currentUser.uid
    };

    const createRoutineChallengeNoDescrip = {
      challengeName: this.challengeName,
      duration: this.duration,
      datetimestamp: timestamp,
      category: "Routine",
      owner: firebase.auth().currentUser.uid
    };

    if (this.challengeDescription === undefined) {
      this.createCha.addCreateRoutineChallenge(createRoutineChallengeNoDescrip);
    } else {
      this.createCha.addCreateRoutineChallenge(createRoutineChallenge);
    }
  }

}
