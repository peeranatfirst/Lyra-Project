import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatetimestampService } from "app/services/datetimestamp.service";
import { GetUserInfoService } from "app/services/get-user-info.service";

@Injectable()
export class FavoriteService {

  constructor(private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private user: GetUserInfoService) { }

  favorite(challengeId, userId){
    let status = 'true';
    firebase.database().ref('/AllChallenge/'+challengeId+'/favorite/'+userId).set(status);
    firebase.database().ref('/users/'+userId+'/favorite/'+challengeId).set(status);
  }

  unfavorite(challengeId, userId){
    console.log("using unfavorite method");
    firebase.database().ref('/AllChallenge/'+challengeId+'/favorite/'+userId).remove();
    firebase.database().ref('/users/'+userId+'/favorite/'+challengeId).remove();
  }

}
