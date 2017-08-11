import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class CreateChallengesService {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // Function for create a saving money challenge with Image upload
  addCreateSavingmoneyChallenge(createSavingmoneyChallenge) {
    const storageRef = firebase.storage().ref();
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const path = `/savingmoneychallenges/${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        createSavingmoneyChallenge.image = selectedFile.name;
        createSavingmoneyChallenge.path = path;
        const promise = new Promise((resolve, reject) => {
          resolve(firebase.database().ref('/Categories /SavingMoney').push().key);
        }).then((val) => {
          firebase.database().ref('/Categories /SavingMoney/' + val).set(createSavingmoneyChallenge);
          return val;
        }).then((key) => {
          this.router.navigate(['detailsavingmoney/' + key]);
        });
      });
    }
    return "should be fix";
  }
}