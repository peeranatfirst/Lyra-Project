import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { FirebaseService } from "app/services/firebase.service";


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
  
  constructor(private user: GetUserInfoService,
  private af: AngularFire) { }

  ngOnInit() {
    this.af.auth.subscribe(auth =>{
      if(auth){
        this.uid = auth.uid;
        this.user.getUserInfo(this.uid).subscribe(info =>{
          this.userInfo = info;
          this.displayName = this.user.getName(info);
          // console.log(this.displayName);
          this.displayPhoto = this.user.getDisplayPhoto(info);
          // console.log(this.displayPhoto);
          this.description = this.user.getDescription(info);
          // console.log(this.description);
        })
      }
    });
  }

}
