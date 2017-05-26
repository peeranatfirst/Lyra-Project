import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AddMoneyService } from 'app/services/add-money.service';
import * as firebase from 'firebase';

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
    private router: Router,
    private route: ActivatedRoute,
    private addmoney: AddMoneyService) { }

  ngOnInit() {
    // Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getChallengeDetail(this.id).subscribe(checkdata => {
      this.checkdata = checkdata;
    });
  }

  onAddSubmit() {
    const status = "processing";
    const start = firebase.database.ServerValue.TIMESTAMP;
    const savingmoneydetail = {
      challengeName: this.checkdata.challengeName,
      challengeDescription: this.checkdata.challengeDescription,
      challengeStatus: status,
      duration: this.checkdata.duration,
      totalAmount: this.checkdata.totalAmount,
      startDate : start,
      path : this.checkdata.path
    };

    const savingmoneydetailNoDescrip = {
      challengeName: this.checkdata.challengeName,
      challengeStatus: status,
      duration: this.checkdata.duration,
      totalAmount: this.checkdata.totalAmount,
      startDate : start,
      path : this.checkdata.path
    };

    if (this.challengeDescription === undefined) {
      this.addmoney.addSavingmoneydetailChallenges(savingmoneydetailNoDescrip);
    } else {
      this.addmoney.addSavingmoneydetailChallenges(savingmoneydetail);
    }
    this.router.navigate(['/mychallenge']);

  }
}
