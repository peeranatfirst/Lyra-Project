import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";
import { routing } from '../app.routing';
import {Router,  ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-my-challenge',
  templateUrl: './my-challenge.component.html',
  styleUrls: ['./my-challenge.component.css']
})
export class MyChallengeComponent implements OnInit {

  myChallenges:any;

  constructor(
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getMyChallenges().subscribe(myChallenges => {
      console.log(myChallenges);
      this.myChallenges = myChallenges;
  })

  }
}