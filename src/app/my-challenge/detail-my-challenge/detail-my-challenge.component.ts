import { Component, OnInit } from '@angular/core';
import { routing } from '../../app.routing';
import { FirebaseService } from "app/services/firebase.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetailSavingMoneyComponent } from '../../categoriesfeed/savingmoney/detail-saving-money/detail-saving-money.component'
import { AddMoneyService } from '../../services/add-money.service';
import { DatetimestampService } from "app/services/datetimestamp.service";

@Component({
  selector: 'app-detail-my-challenge',
  templateUrl: './detail-my-challenge.component.html',
  styleUrls: ['./detail-my-challenge.component.css']
})
export class DetailMyChallengeComponent implements OnInit {
  id: any;
  key: any;
  detailMyChallenge: any;
  imageUrl: any;
  percent: any;
  detailTransaction: any;
  countNumber: number;
  challengeDetail;
  detailBalance: any;
  currentBalance:any;
  detailMyTransaction:any;
  startDate:any;


  constructor(
    private firebaseService: FirebaseService,
    private AddMoneyService: AddMoneyService,
    private router: Router,
    private route: ActivatedRoute,
    private dt : DatetimestampService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getDetailMyChallenge(this.id).subscribe(detailMyChallenge => {
      //console.log(detailMyChallenge)
      this.detailMyChallenge = detailMyChallenge;
      this.startDate = this.dt.getDatestamp(this.detailMyChallenge.startDate);


      this.firebaseService.getTransaction(detailMyChallenge.$key).subscribe(toCal => {
        var sum = 0;
        for (let calB of toCal) {
          let balance = this.firebaseService.getTransactionBalance(calB);
          sum = sum + balance;

        }
        this.currentBalance=sum;
        this.percent = this.firebaseService.calculateProgressPercent(sum, detailMyChallenge.totalAmount);
        if (this.percent > 100) {
          this.percent = 100;
        }
      })
    })

    this.firebaseService.getTransaction(this.id).subscribe(detailTransaction => {
      this.detailTransaction = detailTransaction;
      //console.log(this.detailTransaction);
      this.detailMyTransaction = new Array();
      this.detailTransaction.forEach(element => {
        let date = this.dt.getDatestamp(element.datetimestamp);
        let time = this.dt.getTimestamp(element.datetimestamp);
        this.detailMyTransaction.push({key: element.$key, balance: element.balance, datestamp:date,timestamp:time});
      });

    })

  }

  onDeleteChallenge() {
    if (confirm("Are you sure to delete " + this.detailMyChallenge.challengeName + " Challenge")) {
      this.AddMoneyService.deleteChallenge(this.detailMyChallenge.$key);
      this.router.navigate(['/mychallenge'])
    }

  }

  onDeleteTransaction(key) {
    this.AddMoneyService.deleteTransaction(this.detailMyChallenge.$key,key);
    this.router.navigate(['/detailmychallenge/'+this.detailMyChallenge.$key])
   }

}
