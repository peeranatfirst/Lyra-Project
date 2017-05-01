import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AddMoneyService } from "app/services/add-money.service";

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
    private route: ActivatedRoute) { }

  ngOnInit() {
    //Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getChallengeMoneyData(this.id).subscribe(checkdata => {
      console.log(checkdata)
      this.checkdata = checkdata;
    })

  }

  onAddSubmit() {
    let savingmoneydetail = {
      challengeName: this.checkdata.challengeName,
      challengeDescription: this.checkdata.challengeDescription,
      duration: this.checkdata.duration,
      totalAmount: this.checkdata.totalAmount
    }

    //this.firebaseService.addSavingmoneydetailChallenges(savingmoneydetail);
    this.router.navigate(['/mychallenge'])
  }
}
