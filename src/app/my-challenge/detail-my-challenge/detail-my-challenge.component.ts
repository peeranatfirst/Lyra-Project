import { Component, OnInit } from '@angular/core';
import { routing } from '../../app.routing';
import { FirebaseService } from "app/services/firebase.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetailSavingMoneyComponent } from '../../categoriesfeed/savingmoney/detail-saving-money/detail-saving-money.component';
import { AddMoneyService } from '../../services/add-money.service';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import * as firebase from 'firebase';
import { CalculatePercentSuccessService } from 'app/services/calculate-percent-success.service';

@Component({
  selector: 'app-detail-my-challenge',
  templateUrl: './detail-my-challenge.component.html',
  styleUrls: ['./detail-my-challenge.component.css']
})
export class DetailMyChallengeComponent implements OnInit {
  id: any;
  key: any;
  detailMyChallenge: any;
  imgURL: any;
  percent: any;
  detailTransaction: any;
  countNumber: number;
  challengeDetail;
  detailBalance: any;
  currentBalance: any;
  detailMyTransaction: any;
  startDate: any;
  uid:any;

  constructor(
    private firebaseService: FirebaseService,
    private AddMoneyService: AddMoneyService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private calculate :CalculatePercentSuccessService) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    this.uid = firebase.auth().currentUser.uid;

    this.firebaseService.getDetailMySMChallenge(this.uid,this.id).subscribe(detailMyChallenge => {
      this.detailMyChallenge = detailMyChallenge;
      this.startDate = this.dt.getDatestamp(this.detailMyChallenge.startDate); // convert timestamp to date
      this.getImgURL(this.detailMyChallenge.path);
      this.firebaseService.getTransaction(this.uid, detailMyChallenge.$key).subscribe(toCal => {
        let sum = 0;
        for (const calB of toCal) {
          const balance = this.firebaseService.getTransactionBalance(calB);
          sum = sum + balance;
        }
        this.currentBalance = sum;
        this.percent = this.calculate.calculateSMProgressPercent(sum, detailMyChallenge.totalAmount);
        if (this.percent > 100) {
          this.percent = 100;
        }
      });
    });

    this.firebaseService.getTransaction(this.uid ,this.id).subscribe(detailTransaction => {
      this.detailTransaction = detailTransaction;
      this.detailMyTransaction = new Array();
      this.detailTransaction.forEach(element => {
        const date = this.dt.getDatestamp(element.datetimestamp);
        const time = this.dt.getTimestamp(element.datetimestamp);
        this.detailMyTransaction.push({ key: element.$key, balance: element.balance, datestamp: date, timestamp: time });
      });

    });

  }

  onCancelChallenge() {
    if (confirm("Are you sure to cancel " + this.detailMyChallenge.challengeName + " Challenge?")) {
      this.AddMoneyService.cancelChallengeUpdate(this.uid, this.detailMyChallenge.$key);
      this.router.navigate(['/mychallenge']);
    }

  }

  onDeleteChallenge() {
    if (confirm("Are you sure to delete " + this.detailMyChallenge.challengeName + " Challenge?")) {
      this.AddMoneyService.deleteChallenge(this.uid, this.detailMyChallenge.$key);
      this.router.navigate(['/mychallenge']);
    }

  }

  onDeleteTransaction(key) {
    if (confirm("Are you sure to delete?")) {
      this.AddMoneyService.deleteTransaction(this.uid, this.detailMyChallenge.$key, key);
      this.router.navigate(['/detailmychallenge/' + this.detailMyChallenge.$key]);
    }
  }

   getImgURL(path){
      const storage = firebase.storage();
      const pathRef = storage.ref().child(path).getDownloadURL().then((val)=>{
        this.imgURL=val;
      });
   }
}
