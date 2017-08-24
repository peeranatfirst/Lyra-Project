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
}

interface usersInfo {
  $key?: string;
  joined?: string;
  name?: string;
  description?: string;
  pathPhoto?: string;
}