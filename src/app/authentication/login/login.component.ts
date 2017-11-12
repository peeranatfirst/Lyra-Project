import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn } from '../../router.animation';
import { AuthGuard } from "../../services/auth.service";
import { FirebaseService } from "../../services/firebase.service";
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]':''}
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(public af: AngularFire,private router: Router, private ag: AuthGuard, private fs: FirebaseService) {

      this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/mychallenge');
      }
    });

  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
          this.af.auth.subscribe(auth => {
            if(auth) {
              const uid = auth.uid;
              this.checkExistUser(uid);
            }
          });
        this.router.navigate(['/mychallenge']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
          this.af.auth.subscribe(auth => {
            if(auth) {
              const uid = auth.uid;
              this.checkExistUser(uid);
            }
          });
        this.router.navigate(['/mychallenge']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  checkExistUser(uid){
    // console.log(uid);
    const ref = firebase.database().ref('/users');

    ref.once("value").then(function(snapshot){
      const userExist = snapshot.child(uid).exists(); // check uid in database
     
      if(userExist){
        console.log("user already exist!");
      }else{
        console.log("user is new"); 
        firebase.database().ref('/users/'+uid).set({
          joined: firebase.database.ServerValue.TIMESTAMP,
          description: "write something about you",
          name: firebase.auth().currentUser.displayName,
          pathPhoto: firebase.auth().currentUser.photoURL,
          achievement: {SavingMoney: 0, Checklist: 0, Step: 0, Routine: 0}
        });
      }
    });
  }

  ngOnInit() {
  }

}
