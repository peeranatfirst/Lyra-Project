import { Component, OnInit } from '@angular/core';
import { routing } from '../../../app.routing';
import { FirebaseService } from "app/services/firebase.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-detail-saving-money',
  templateUrl: './detail-saving-money.component.html',
  styleUrls: ['./detail-saving-money.component.css'],
})
export class DetailSavingMoneyComponent implements OnInit {
  id: any;
  challengeDetail: any;
  imageUrl: any;

  challengeName: any;
  challengeDescription: any;
  duration:any;
  totalAmount;

  constructor(
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getChallengeDetail(this.id).subscribe(challengeDetail => {
      console.log(challengeDetail)
      this.challengeDetail = challengeDetail;

      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(challengeDetail.path);
      storageRef.child(challengeDetail.path).getDownloadURL().then((url) => {
        //Set image url
        this.imageUrl = url;
      })
    })

  }

}