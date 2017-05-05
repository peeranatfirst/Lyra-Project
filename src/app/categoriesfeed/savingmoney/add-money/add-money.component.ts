import { Component, OnInit, ViewContainerRef } from '@angular/core';
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
  addmoney: any;

  id: any;
  detailMyChallenge: any;
  balance: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private AddMoneyService: AddMoneyService,
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private modal: Modal  ){
       modal.overlay.defaultViewContainer = vcRef;
     }

  ngOnInit() {
    //Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getDetailMyChallenge(this.id).subscribe(detailMyChallenge => {
      //console.log(detailMyChallenge)
      this.detailMyChallenge = detailMyChallenge;
    })



  }

  onAddSubmit() {
    let addmoney = this.balance;
    let totalAmount = this.detailMyChallenge.totalAmount;
    let currentMoney;
    this.firebaseService.getTransaction(this.id).subscribe(toCal => {
      var sum = 0;
      for (let calB of toCal) {
        let balance = this.firebaseService.getTransactionBalance(calB);
        sum = sum + balance;
      }
      currentMoney = sum;

    })

    let toAchieved = totalAmount - currentMoney;
    if (toAchieved > 0) {
      if (addmoney <= toAchieved) {
        this.AddMoneyService.addMoney(addmoney, this.id);
        this.modal.alert()
          .size('sm')
          .isBlocking(false)
          .showClose(false)
          .keyboard(27)
          .title('Completed')
          .body('Keep going!!')
          .okBtn('Okay')
          .okBtnClass('btn btn-primary')
          .open();

      } else {
        this.AddMoneyService.addMoney(addmoney, this.id);
        this.AddMoneyService.achievedStatusUpdate(this.id);
        this.modal.alert().size('lg').title('Achieved').body(`this is body`).open();
      }
    }else{
       this.modal.alert().size('lg').title('Cannot Add Money').body(`this is body`).open(); 
    }
   

    //this.router.navigate(['/detailmychallenge/' + this.id])
  }



}


