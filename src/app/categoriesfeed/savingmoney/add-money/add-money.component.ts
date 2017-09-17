import { Component, OnInit } from '@angular/core';
import { AddMoneyService } from 'app/services/add-money.service';
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from 'app/services/firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {

  id: any;
  detailMyChallenge: any;
  balance: any;
  currentBalance: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private AddMoneyService: AddMoneyService, ) {

  }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    // Get id
    this.id = this.route.snapshot.params['id'];
    // Get detail of Challenge
    this.firebaseService.getDetailMySMChallenge(uid, this.id).subscribe(detailMyChallenge => {
      this.detailMyChallenge = detailMyChallenge;
    });

    // Calculate Current Balance
    this.firebaseService.getTransaction(uid, this.id).subscribe(toCal => {
      const sum = this.AddMoneyService.calculateBalance(toCal);
      this.currentBalance = sum;
    });

  }

  onAddSubmit() {
    const addmoney = this.balance;
    const totalAmount = this.detailMyChallenge.totalAmount;
    const uid = firebase.auth().currentUser.uid;
    let currentMoney;
    this.firebaseService.getTransaction(uid, this.id).subscribe(toCal => {
      currentMoney = this.AddMoneyService.calculateBalance(toCal);
    });

    const toAchieved = totalAmount - currentMoney;

    if (addmoney < toAchieved) {
      this.AddMoneyService.addMoney(addmoney,uid, this.id);
    } else {
      this.AddMoneyService.addMoney(addmoney,uid, this.id);
      this.AddMoneyService.achievedStatusUpdate(uid, this.id);
    }
    this.router.navigate(['/detailmySavingMoneychallenge/' + this.id]);
  }

}


