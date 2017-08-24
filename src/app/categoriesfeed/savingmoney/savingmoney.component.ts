import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';

import { GetUserInfoService } from "app/services/get-user-info.service";

@Component({
  selector: 'app-savingmoney',
  templateUrl: './savingmoney.component.html',
  styleUrls: ['./savingmoney.component.css']
})
export class SavingmoneyComponent implements OnInit {

  listOfChallenge: any[]; // collecting Array of Object to show in feeds page

  constructor(
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute,
    private dt : DatetimestampService,
    private userInfo: GetUserInfoService
  ) { }


  ngOnInit() {
    // Get list of challenges in Saving money categories and picture description to show
    this.listOfChallenge = new Array();
    let imgPath;
    this.firebaseService.getChallengeList().subscribe(challengeList => {
      
      let key,name,des,duration,goal ,path, datestamp,timestamp,category,uid,ownerPhoto,displayName;
      
      for(const addObj of challengeList){
        path = this.firebaseService.getListOfChallengePath(addObj);   
        category = this.firebaseService.getListOfChallengeCategory(addObj);
        if(category === "SavingMoney"){
          uid = this.firebaseService.getListOfOwnwer(addObj);
          const userinfo = this.userInfo.getUserInfo(uid).subscribe(info => {
            displayName = info.name;
            ownerPhoto = info.pathPhoto;
          })

          const storage = firebase.storage();
          const pathRef = storage.ref();
          const promise = new Promise((resolve, reject)=> {
              resolve(pathRef.child(path).getDownloadURL());
          });
          promise.then((res) => {
              imgPath =  res ; 
              return imgPath ;
          }).then((res) => {
              key = this.firebaseService.getListOfChallengeId(addObj);
              name = this.firebaseService.getListOfChallengeName(addObj);
              des = this.firebaseService.getListOfChallengeDes(addObj);
              goal = this.firebaseService.getListOfChallengeGoal(addObj);
              duration = this.firebaseService.getListOfChallengeDuration(addObj);
              const datetimestamp = this.firebaseService.getListOfChallengeTimestamp(addObj);
              datestamp = this.dt.getDatestamp(datetimestamp);
              timestamp = this.dt.getTimestamp(datetimestamp);
              this.listOfChallenge.push({chaId: key,chaName: name,chaGoal: goal,description:des,time:duration,imgSRC:imgPath , thisTime: timestamp, thisDay: datestamp, pic: ownerPhoto, username: displayName });
          });
        }
      }
      
    });
  }

}