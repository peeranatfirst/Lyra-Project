import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/angularfire2";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as firebase from 'firebase';
import { FirebaseService } from "../../app/services/firebase.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AngularFireAuth, private router: Router, private af: AngularFire, private fs: FirebaseService) {}

    canActivate(): Observable<boolean> {
      return Observable.from(this.auth)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if 
        (!authenticated) this.router.navigate([ '/login' ]);
      })
    }
}

