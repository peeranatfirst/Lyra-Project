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
          this.router.navigate(['detailSavingMoney/' + key]);
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
  addTasksChecklistChallenge(obj, id){
    firebase.database().ref('/AllChallenge/'+id+'/tasks').push(obj);
  }

  // Fuction for create a step challenge with Image Upload
  addStepChallenge(createStepChallenge){
    const storageRef = firebase.storage().ref();
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const path = `/stepchallenges/${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        createStepChallenge.image = selectedFile.name;
        createStepChallenge.path = path;
        const promise = new Promise((resolve, reject) => {
          resolve(firebase.database().ref('/AllChallenge').push().key);
        }).then((val) => {
          firebase.database().ref('/AllChallenge/' + val).set(createStepChallenge);
          return val;
        }).then((key) => {
          this.router.navigate(['createtaskstep/' + key]);
        });
      });
    }
    return "should be fix";
  }

  // Function for add steps to step challenge
  addTasksStepChallenge(obj, id){
    firebase.database().ref('/AllChallenge/'+id+'/steps').push(obj);
  }

  // Fuction for create a routine challenge with Image Upload
  addCreateRoutineChallenge(createRoutineChallenge){
    const storageRef = firebase.storage().ref();
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const path = `/routinechallenges/${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        createRoutineChallenge.image = selectedFile.name;
        createRoutineChallenge.path = path;
        const promise = new Promise((resolve, reject) => {
          resolve(firebase.database().ref('/AllChallenge').push().key);
        }).then((val) => {
          firebase.database().ref('/AllChallenge/' + val).set(createRoutineChallenge);
          return val;
        }).then((key) => {
          this.router.navigate(['detailRoutine/' + key]);
        });
      });
    }
    return "should be fix";
  }


}
