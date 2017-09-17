import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { FirebaseService } from "app/services/firebase.service";
import * as firebase from 'firebase';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  uid: any;
  displayName: any;
  displayPhoto: any;
  description: any;
  userInfo: any;
  
  challengeNum: any;
  constructor(private user: GetUserInfoService,
  private af: AngularFire) { }

  ngOnInit() {
    this.af.auth.subscribe(auth =>{
      if(auth){
        this.uid = auth.uid;
        this.user.getUserInfo(this.uid).subscribe(info =>{
          this.userInfo = info;
          this.displayName = this.user.getName(info);
          this.displayPhoto = this.user.getDisplayPhoto(info);
          this.description = this.user.getDescription(info);
        })


        let key; 
        let num =0;
        const query = firebase.database().ref("AllChallenge").orderByKey();
        query.once("value")
          .then((snapshot)=>{
            snapshot.forEach((childSnapshot)=>{
              key = childSnapshot.key;
              const subQuery = firebase.database().ref("AllChallenge/"+key).orderByKey();
              subQuery.once("value")
                .then((thirdSnapshot)=>{
                  var data = thirdSnapshot.val();
                  var user = auth.uid;
                  if(data.owner === user){
                    num = num+1;
                    this.challengeNum = num; // should improve
                  }console.log(num);
                })
            
            })
            
          })
      }
    });
  }

}
