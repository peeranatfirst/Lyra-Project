import { Component, OnInit } from '@angular/core';
import { routing } from '../../../app.routing';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-detail-saving-money',
  templateUrl: './detail-saving-money.component.html',
  styleUrls: ['./detail-saving-money.component.css'],
})
export class DetailSavingMoneyComponent implements OnInit {
  id: any;
  challengeDetail: any;
  imageUrl: any;
  datestamp:any;
  timestamp:any;
  challengeName: any;
  challengeDescription: any;
  duration:any;
  totalAmount;
  displayName:any;
  info:any;
  ownerPhoto:any;
  user: any;

  constructor(
    public af: AngularFire,
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private userinfo: GetUserInfoService) { 
      this.af.auth.subscribe(auth =>{
        if(auth){
          this.user = auth;
        }
      });
    }

  ngOnInit() {
    // Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getChallengeDetails(this.id).subscribe(challengeDetail => {
      // console.log(challengeDetail)
      this.challengeDetail = challengeDetail;
      this.datestamp = this.dt.getDatestamp(this.challengeDetail.datetimestamp);
      this.timestamp = this.dt.getTimestamp(this.challengeDetail.datetimestamp);

      const storageRef = firebase.storage().ref();
      const spaceRef = storageRef.child(challengeDetail.path);
      storageRef.child(challengeDetail.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      });
      
      const uid = this.challengeDetail.owner;
      this.userinfo.getUserInfo(uid).subscribe(info => {
        this.info = info;
        this.displayName = this.info.name;
        this.ownerPhoto = this.info.pathPhoto;
      });
      
      
    });

  }

}