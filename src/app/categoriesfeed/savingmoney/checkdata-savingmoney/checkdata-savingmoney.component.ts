import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-checkdata-savingmoney',
  templateUrl: './checkdata-savingmoney.component.html',
  styleUrls: ['./checkdata-savingmoney.component.css']
})
export class CheckdataSavingmoneyComponent implements OnInit {
  id: any;
  checkdata: any;
  imageUrl: any;

  challengeName: any;
  challengeDescription: any;
  duration: any;
  totalAmount;
  
  constructor(
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getChallengeMoneyData(this.id).subscribe(checkdata => {
      console.log(checkdata)
      this.checkdata = checkdata;

    })

  }

}
