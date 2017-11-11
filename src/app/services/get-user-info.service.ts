import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class GetUserInfoService {

  userInfo: FirebaseObjectObservable<any>;

  constructor(
    private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute) { }

    getUserInfo(uid) {
      this.userInfo = this.af.database.object('/users/' + uid) as FirebaseObjectObservable<usersInfo>;
      return this.userInfo;
    }

    getDisplayPhoto(displayphoto: usersInfo){
      return displayphoto.pathPhoto;
    }

    getDescription(description: usersInfo){
      return description.description;
    }

    getName(name: usersInfo){
      return name.name;
    }

    getJoinDate(date: usersInfo){
      return date.joined;
    }

    getUsername(userid){
      var username;
      const query = firebase.database().ref("users/" + userid);
      query.once("value")
        .then((snapshot) => {
          username = snapshot.val().name;
        })
      return username;
    }

}

interface usersInfo {
  $key?: string;
  joined?: string;
  name?: string;
  description?: string;
  pathPhoto?: string;
}