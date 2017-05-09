import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class CreateChallengesService {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  //Function for create a saving money challenge with Image upload
  addCreateSavingmoneyChallenge(createSavingmoneyChallenge) {
    let storageRef = firebase.storage().ref();
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/savingmoneychallenges/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        createSavingmoneyChallenge.image = selectedFile.name;
        createSavingmoneyChallenge.path = path;
        const promise = new Promise((resolve, reject) => {
          resolve(firebase.database().ref('/Categories /SavingMoney').push().key);
        }).then((val) => {
          firebase.database().ref('/Categories /SavingMoney/' + val).set(createSavingmoneyChallenge);
          return val
        }).then((key) => {
          this.router.navigate(['detailsavingmoney/' + key]);
        })
      })
    }
    return "should be fix";
  }
}
