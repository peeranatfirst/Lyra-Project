import { Component, OnInit } from '@angular/core';
import { routing } from '../../../app.routing';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { AngularFire } from 'angularfire2';
import { Location } from '@angular/common';
import $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-routine',
  templateUrl: './detail-routine.component.html',
  styleUrls: ['./detail-routine.component.css']
})
export class DetailRoutineComponent implements OnInit {

  id: any;
  challengeDetail: any;
  imageUrl: any;
  datestamp: any;
  timestamp: any;
  challengeName: any;
  challengeDescription: any;
  duration: any;
  totalAmount;
  displayName: any;
  info: any;
  ownerPhoto: any;
  user: any;
  uid: any;

  isOwner: any;

  constructor(public af: AngularFire,
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private location: Location,
    private userinfo: GetUserInfoService,
    private modalService: NgbModal) { 
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.user = auth;
        }
      });
    }

  ngOnInit() {
    //open comment
    $(document).ready(function () {
      $("#commentBt").click(function () {
        document.getElementById('card-comment').style.display = '';
      })
      $("body").css('overflow', 'scroll');


    });


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

      this.uid = this.challengeDetail.owner;
      var currentUser = firebase.auth().currentUser.uid;
      if(this.uid == currentUser){
        this.isOwner = true;
      }else{
        this.isOwner = false;
      }

      this.userinfo.getUserInfo(this.uid).subscribe(info => {
        this.info = info;
        this.displayName = this.info.name;
        this.ownerPhoto = this.info.pathPhoto;
      });


    });
  }

  onBack() {
    this.location.back();
  }

  onDeleteChallenge(){
      firebase.database().ref('/AllChallenge/'+this.id).remove();
      this.routing.navigate(['routinechallenge/']);
  }

  open(content) {
    this.modalService.open(content);
  }

}
