import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn } from '../../router.animation';
import { AuthGuard } from "../../services/auth.service";
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]':''}
})
export class LoginComponent implements OnInit {

  error: any;
  userList:any[];
  authUID:any;

  constructor(public af: AngularFire,private router: Router, private ag: AuthGuard, private fs: FirebaseService) {

      this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/');
      }
    });

  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.checkUserID();
        this.router.navigate(['/']);
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
          this.checkUserID();
        this.router.navigate(['/']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  checkUserID(){
    this.af.auth.subscribe(auth => {
      if(auth){
        this.authUID = auth.uid;
        this.ag.checkExistUsers(this.authUID);
      }
    });
  }


  ngOnInit() {
  }

}
