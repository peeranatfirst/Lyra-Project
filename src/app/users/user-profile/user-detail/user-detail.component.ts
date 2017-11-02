import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { FirebaseService } from "app/services/firebase.service";
import * as firebase from 'firebase';

import { FollowService } from "app/services/follow.service";
import { size } from "lodash";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  uid: any;
  displayName: any;
  displayPhoto: any;
  description: any;
  userInfo: any;

  challengeNum: any;

  @Input() user;        // a user who can be followed
  @Input() currentUser; // currently logged in user

  followerCount: number;
  isFollowing: boolean;
  followers;
  following;
  
  constructor(private users: GetUserInfoService,
    private af: AngularFire,
    private followSvc: FollowService) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.users.getUserInfo(this.uid).subscribe(info => {
          this.userInfo = info;
          this.displayName = this.users.getName(info);
          this.displayPhoto = this.users.getDisplayPhoto(info);
          this.description = this.users.getDescription(info);
        })


        let key;
        let num = 0;
        const query = firebase.database().ref("AllChallenge").orderByKey();
        query.once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              key = childSnapshot.key;
              const subQuery = firebase.database().ref("AllChallenge/" + key).orderByKey();
              subQuery.once("value")
                .then((thirdSnapshot) => {
                  var data = thirdSnapshot.val();
                  var user = auth.uid;
                  if (data.owner === user) {
                    num = num + 1;
                    this.challengeNum = num; // should improve
                  }
                })
            })
          })
      }
    });

    const userId = this.user.$key
    const currentUserId = this.currentUser.uid
    // checks if the currently logged in user is following this.user
    this.following = this.followSvc.getFollowing(currentUserId, userId)
                                   .subscribe(following => {
                                      this.isFollowing = following.$value
                                    })
    // retrieves the follower count for a user's profile
    this.followers = this.followSvc.getFollowers(userId)
                                   .subscribe(followers => {
                                     this.followerCount = this.countFollowers(followers)
                                    })

  }

  private countFollowers(followers) {
    if (followers.$value===null) return 0
    else return size(followers)
  }

  toggleFollow() {
    const userId = this.user.$key
    const currentUserId = this.currentUser.uid
    if (this.isFollowing) this.followSvc.unfollow(currentUserId, userId)
    else this.followSvc.follow(currentUserId, userId)
  }

  ngOnDestroy() {
    this.followers.unsubscribe()
    this.following.unsubscribe()
  }

}
