import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animation';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]':''}
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;

  displayname: any;
  constructor(public af: AngularFire,private router: Router) {

  }
  
  onSubmit(formData) {
   /* if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        this.router.navigate(['/members'])
      }).catch(
        (err) => {
        this.error = err;
      })
    }*/

    if(formData.valid){
      this.displayname = formData.value.displayname;
      firebase.auth().createUserWithEmailAndPassword(formData.value.email, formData.value.password)
      .then(()=>{
        firebase.auth().currentUser.updateProfile({
          displayName: this.displayname,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/lyra-24b71.appspot.com/o/images%2Fuser.png?alt=media&token=31599b22-dbfe-40ac-8476-e54b838cb214"
        })
      }).then(()=>{
        firebase.auth().signOut()
      }).then(()=>{
        this.router.navigate(['/login-email']);
      })
    }
  }

  ngOnInit() {
  }

}
