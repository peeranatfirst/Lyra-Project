import { Component, OnInit } from '@angular/core';
import { routing } from '../../../app.routing';
import { FirebaseService } from "app/services/firebase.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail-saving-money',
  templateUrl: './detail-saving-money.component.html',
  styleUrls: ['./detail-saving-money.component.css']
})
export class DetailSavingMoneyComponent implements OnInit {
  id: any;
  challengeDetail: any;
  imageUrl: any;

  constructor(
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //Get id
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getChallengeDetail().subscribe(challengeDetail => {
      console.log(challengeDetail)
      this.challengeDetail = challengeDetail;
   
    })
  }
}