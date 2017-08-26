import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animation';
import * as firebase from 'firebase';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]':''}
})
export class EmailComponent implements OnInit {

    state: string = '';
    error: any;

    constructor(public af: AngularFire,private router: Router) {
      this.af.auth.subscribe(auth => { 
        if(auth) {
          this.router.navigateByUrl('/members');
        }
      });
  }


  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
          this.af.auth.subscribe(auth => {
            if(auth) {
              const uid = auth.uid;
              this.checkExistUser(uid);
            }
          });
        this.router.navigate(['/']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  checkExistUser(uid){
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
          pathPhoto: firebase.auth().currentUser.photoURL
        });
      }
    });
  }

  ngOnInit() {
  }

}
