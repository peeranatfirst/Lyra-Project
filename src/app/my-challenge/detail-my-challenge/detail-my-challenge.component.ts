import { Component, OnInit } from '@angular/core';
import { routing } from '../../app.routing';
import { FirebaseService } from "app/services/firebase.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail-my-challenge',
  templateUrl: './detail-my-challenge.component.html',
  styleUrls: ['./detail-my-challenge.component.css']
})
export class DetailMyChallengeComponent implements OnInit {
  id: any;
  detailMyChallenge: any;
  imageUrl: any;
  percent: any;
  detailTransaction: any;
  countNumber: number;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getDetailMyChallenge(this.id).subscribe(detailMyChallenge => {
      //console.log(detailMyChallenge)
      this.detailMyChallenge = detailMyChallenge;


      //download image from storage in firebase
       /*let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(detailMyChallenge.path);
      storageRef.child(detailMyChallenge.path).getDownloadURL().then((url) => {
        //Set image url
        this.imageUrl = url;
      })*/


      this.firebaseService.getTransaction(detailMyChallenge.$key).subscribe(toCal => {
        var sum = 0;
        for (let calB of toCal) {
          let balance = this.firebaseService.getTransactionBalance(calB);
          sum = sum + balance;

        }
        this.percent = this.firebaseService.calculateProgressPercent(sum, detailMyChallenge.totalAmount);
        if(this.percent>100){
          this.percent = 100;
        }
      })
    })

    this.firebaseService.getTransaction(this.id).subscribe(detailTransaction => {
      //console.log(detailTransaction)
      this.detailTransaction = detailTransaction;

    })

  }

  onDeleteClick(){
    this.firebaseService.deleteMychallenge(this.id);

    this.router.navigate(['/mychallenge'])
  }

}
