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
          resolve(firebase.database().ref('/AllChallenge').push().key);
        }).then((val) => {
          firebase.database().ref('/AllChallenge/' + val).set(createSavingmoneyChallenge);
          return val;
        }).then((key) => {
          this.router.navigate(['detailsavingmoney/' + key]);
        });
      });
    }
    return "should be fix";
  }

  // Fuction for create a checklist challenge with Image Upload
  addCreateChecklistChallenge(createChecklistChallenge) {
    const storageRef = firebase.storage().ref();
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const path = `/checklistchallenges/${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        createChecklistChallenge.image = selectedFile.name;
        createChecklistChallenge.path = path;
        const promise = new Promise((resolve, reject) => {
          resolve(firebase.database().ref('/AllChallenge').push().key);
        }).then((val) => {
          firebase.database().ref('/AllChallenge/' + val).set(createChecklistChallenge);
          return val;
        }).then((key) => {
          this.router.navigate(['createtaskchecklist/' + key]);
        });
      });
    }
    return "should be fix";
  }

  // Function for add tasks to checklist challenge
  addTasksChecklistChallenge(){
    
  }
}
