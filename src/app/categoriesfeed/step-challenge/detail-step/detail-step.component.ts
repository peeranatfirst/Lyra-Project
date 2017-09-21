import { Component, OnInit } from '@angular/core';
import { routing } from '../../../app.routing';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { Location } from "@angular/common";
import $ from 'jquery';

@Component({
  selector: 'app-detail-step',
  templateUrl: './detail-step.component.html',
  styleUrls: ['./detail-step.component.css']
})
export class DetailStepComponent implements OnInit {

  id: any;
  stepChaDetail: any;
  datestamp: any;
  timestamp: any;
  imageUrl: any;
  info: any;
  displayName: any;
  ownerPhoto: any;
  // steps: any;
  
  stepSort: any[];

  uid: any;
  isOwner: any;

  constructor(private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private userinfo: GetUserInfoService,
    private location: Location) { }

  ngOnInit() {
    
    //open comment
    $(document).ready(function () {
      $("#commentBt").click(function () {
        document.getElementById('card-comment').style.display = '';
      })

      $("#closeBt").click(function () {
        document.getElementById('transaction').style.display = 'none';
      })
    });

    // Get id
    this.id = this.route.snapshot.params['id'];
    this.stepSort = new Array();
    this.firebaseService.getChecklistChallengeDetails(this.id).subscribe(step => {
      this.stepChaDetail = step;

      this.datestamp = this.dt.getDatestamp(this.stepChaDetail.datetimestamp);
      this.timestamp = this.dt.getTimestamp(this.stepChaDetail.datetimestamp);

      const storageRef = firebase.storage().ref();
      const spaceRef = storageRef.child(step.path);
      storageRef.child(step.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      });

      this.uid = this.stepChaDetail.owner;
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

    /*this.firebaseService.getStepsOfStepChallenge(this.id).subscribe(steps => {
      this.steps = steps;
    });*/

    const query = firebase.database().ref("AllChallenge/" + this.id +"/steps" ).orderByChild("stepNo");
    query.once("value")
      .then((snapshot) =>{
        snapshot.forEach(element => {
          var data = element.val();
          const steps = {
            stepNo: data.stepNo,
            stepName: data.stepName,
            stepDes: data.stepDes
          }
          this.stepSort.push(steps)
        });
      });

  }

  onBack() {
    this.location.back();
  }

  onDeleteChallenge(){
    if (confirm("Are you sure to delete?")) {
      firebase.database().ref('/AllChallenge/'+this.id).remove();
      this.routing.navigate(['stepchallenge/']);
    }
  }

}
