import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';



@Component({
  selector: 'app-savingmoney',
  templateUrl: './savingmoney.component.html',
  styleUrls: ['./savingmoney.component.css']
})
export class SavingmoneyComponent implements OnInit {
  challengeList: any;
  imageUrl: any;
  id: any;


  constructor(
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.firebaseService.getChallengeList().subscribe(challengeList => {
      console.log(challengeList);
      this.challengeList = challengeList;

      
    })
  }

}