import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onAddSubmit() {
    
    let createSavingmoneyChallenge = {
      challengeName: this.challengeName,
      challengeDescription: this.challengeDescription,
      duration: this.duration,
      totalAmount: this.totalAmount,

    }
    let createSavingmoneyChallengeNoDescrip = {
      challengeName: this.challengeName,
      duration: this.duration,
      totalAmount: this.totalAmount,

    }

    if (this.challengeDescription == undefined) {
      this.firebaseService.addCreateSavingmoneyChallenge2(createSavingmoneyChallengeNoDescrip);
      this.router.navigate(['/savingmoney'])
    } else {
      this.firebaseService.addCreateSavingmoneyChallenge(createSavingmoneyChallenge);
      this.router.navigate(['/savingmoney'])
    }


  }




}


