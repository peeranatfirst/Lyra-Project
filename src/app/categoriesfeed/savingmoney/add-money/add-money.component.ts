import { Component, OnInit } from '@angular/core';
import { AddMoneyService } from "app/services/add-money.service";
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from "app/services/firebase.service";

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {
  money: any;
  id: any;
  detailMyChallenge: any;
  balance: any;
  currentBalance:any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private AddMoneyService: AddMoneyService  ){}

  ngOnInit() {
    //Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getDetailMyChallenge(this.id).subscribe(detailMyChallenge => {
      //console.log(detailMyChallenge)
      this.detailMyChallenge = detailMyChallenge;
    })
    this.firebaseService.getTransaction(this.id).subscribe(toCal => {
      let sum = 0;
      for (let calB of toCal) {
        let balance = this.firebaseService.getTransactionBalance(calB);
        sum = sum + balance;
      }
      this.currentBalance =sum;

    })

  }

  onAddSubmit() {
    let addmoney = this.balance;
    let totalAmount = this.detailMyChallenge.totalAmount;
    let currentMoney;
    this.firebaseService.getTransaction(this.id).subscribe(toCal => {
      let sum = 0;
      for (let calB of toCal) {
        let balance = this.firebaseService.getTransactionBalance(calB);
        sum = sum + balance;
      }
      currentMoney =sum;

    })

    let toAchieved = totalAmount - currentMoney;

     if (addmoney <= toAchieved) {
        this.AddMoneyService.addMoney(addmoney, this.id);
      } else {
        this.AddMoneyService.addMoney(addmoney, this.id);
        this.AddMoneyService.achievedStatusUpdate(this.id);
     }
    this.router.navigate(['/detailmychallenge/' + this.id])
  }



}


