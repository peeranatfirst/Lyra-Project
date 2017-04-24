import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";
import { routing } from '../../app.routing';
import {Router,  ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-savingmoney',
  templateUrl: './savingmoney.component.html',
  styleUrls: ['./savingmoney.component.css']
})
export class SavingmoneyComponent implements OnInit {
  challengeList: any;



  constructor(
    private firebaseService: FirebaseService,



  ) { }


  ngOnInit() {
    this.firebaseService.getChallengeList().subscribe(challengeList => {
      console.log(challengeList);
      this.challengeList = challengeList;

    })
  }

}