import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class TaskManageService {
  amount: any;
  checklistDetails: any;
  tasks: any;
  uid: any;

  stepDetails: any;
  steps: any;

  // routineDetails: any;


  constructor(
    private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute) {
  }

  addChecklistChallengeDetail(checklistdetail, task, uid) {
    this.checklistDetails = checklistdetail;
    this.tasks = task;
    this.uid = uid;
    const promise = new Promise((resolve, reject) => {
      resolve(firebase.database().ref('/users/' + this.uid + '/Challenges').push().key);
    }).then((val) => {
      firebase.database().ref('/users/' + this.uid + '/Challenges/' + val).set(this.checklistDetails);
      return val;
    }).then((val) => {
      for (var i = 0; i < this.tasks.length; i++) {
        const obj = {
          taskName: task[i].taskName,
          level: task[i].level,
          taskStatus: "uncheck"
        }
        firebase.database().ref('/users/' + this.uid + '/Challenges/' + val).child('tasks').push(obj);
      }
    });

    return "should be fix";

  }

  checkTask(uid, chaId, taskId) {
    let stamp = firebase.database.ServerValue.TIMESTAMP;
    const status = {
      taskStatus: "Checked",
      datetimeStamp: stamp
    };
    firebase.database().ref('/users/' + uid + '/Challenges/' + chaId + '/tasks/' + taskId).update(status);
  }

  checkTaskWithCaptionNoImage(uid, chaId, taskId, cap) {
    let stamp = firebase.database.ServerValue.TIMESTAMP;
    const status = {
      taskStatus: "Checked",
      caption: cap,
      datetimeStamp: stamp
    }
    firebase.database().ref('/users/' + uid + '/Challenges/' + chaId + '/tasks/' + taskId).update(status);
  }

  checkTaskWithImage(uid, chaId, taskId, cap) {
    const storageRef = firebase.storage().ref();

    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const path = `/ChecklistReview/${chaId}${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        cap.image = selectedFile.name;
        cap.path = path;
        const promise = new Promise((resolve, reject) => {
          // resolve(firebase.database().ref('/AllChallenge').push().key);
          resolve(firebase.database().ref('/users/' + uid + '/Challenges/' + chaId + '/tasks/' + taskId).update(cap));
        }).then((val) => {
          // firebase.database().ref('/AllChallenge/' + val).set(createSavingmoneyChallenge);
          return val;
        })
      });
    }
  }

  // add step challenge to my challenge
  addStepChallengeDetail(stepdetail, steps, uid) {
    this.stepDetails = stepdetail;
    this.steps = steps;
    this.uid = uid;
    const promise = new Promise((resolve, reject) => {
      resolve(firebase.database().ref('/users/' + this.uid + '/Challenges').push().key);
    }).then((val) => {
      firebase.database().ref('/users/' + this.uid + '/Challenges/' + val).set(this.stepDetails);
      return val;
    }).then((val) => {
      for (var i = 0; i < this.steps.length; i++) {

        if (steps[i].stepNo == 1) {
          console.log(steps[i].stepNo);
          const obj = {
            stepNo: steps[i].stepNo,
            stepName: steps[i].stepName,
            stepDes: steps[i].stepDes,
            stepStatus: "unlocked"
          }
          firebase.database().ref('/users/' + this.uid + '/Challenges/' + val).child('steps').push(obj);
        } else {
          console.log(steps[i].stepNo);
          const obj = {
            stepNo: steps[i].stepNo,
            stepName: steps[i].stepName,
            stepDes: steps[i].stepDes,
            stepStatus: "locked"
          }
          firebase.database().ref('/users/' + this.uid + '/Challenges/' + val).child('steps').push(obj);
        }
      }
    });
  }

  checkStep(uid, chaId, stepId) {
    let stamp = firebase.database.ServerValue.TIMESTAMP;
    const status = {
      stepStatus: "checked",
      datetimeStamp: stamp
    };
    firebase.database().ref('/users/' + uid + '/Challenges/' + chaId + '/steps/' + stepId).update(status);
  }

  checkStepWithCaptionNoImage(uid, chaId, stepId, cap) {
    let stamp = firebase.database.ServerValue.TIMESTAMP;
    const status = {
      stepStatus: "checked",
      caption: cap,
      datetimeStamp: stamp
    }
    firebase.database().ref('/users/' + uid + '/Challenges/' + chaId + '/steps/' + stepId).update(status);
  }

  checkStepWithImage(uid, chaId, stepId, cap) {
    const storageRef = firebase.storage().ref();

    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const path = `/StepReview/${chaId}${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        cap.image = selectedFile.name;
        cap.path = path;
        const promise = new Promise((resolve, reject) => {
          // resolve(firebase.database().ref('/AllChallenge').push().key);
          resolve(firebase.database().ref('/users/' + uid + '/Challenges/' + chaId + '/steps/' + stepId).update(cap));
        }).then((val) => {
          // firebase.database().ref('/AllChallenge/' + val).set(createSavingmoneyChallenge);
          return val;
        })
      });
    }
  }

  unlockStep(uid, chaId, stepNum) {
    const query = firebase.database().ref("users/" + uid + "/Challenges/" + chaId + "/steps").orderByChild("stepNo");
    query.once("value")
      .then((snapshot) => {
        snapshot.forEach(element => {
          var data = element.val();
          if (data.stepNo == stepNum) {
            const status = {
              stepStatus: "unlocked"
            }
            firebase.database().ref('/users/' + uid + '/Challenges/' + chaId + '/steps/' + element.key).update(status);
          }
        })
      });
  }

  // add routine challenge to my challenge
  addRoutineChallengeDetail(routinedetail, uid) {
    this.uid = uid;
    // let start = firebase.database.ServerValue.TIMESTAMP;
    // console.log(start);
    const promise = new Promise((resolve, reject) => {
      resolve(firebase.database().ref('/users/' + this.uid + '/Challenges').push().key);
    }).then((val) => {
      firebase.database().ref('/users/' + this.uid + '/Challenges/' + val).set(routinedetail);
      return val
    }).then((val) => {
      const query = firebase.database().ref("users/" + this.uid + "/Challenges/" + val);
      query.once("value")
        .then((snapshot) => {
          var data = snapshot.val();
          var start = data.startDate;
          for (var i = 1; i <= routinedetail.duration; i++) {
            if (i == 1) {
              const obj = {
                dayNo: i,
                scheduleDate: start,
                status: 'unlocked'
              }
              firebase.database().ref('/users/'+this.uid+'/Challenges/'+val).child('scheduled').push(obj); 
            } else {
              start = start + 30000; // 86400000
              const obj = {
                dayNo: i,
                scheduleDate: start,
                status: 'locked'
              }
              firebase.database().ref('/users/'+this.uid+'/Challenges/'+val).child('scheduled').push(obj); 
            }
          }
        })
    });
  }

}
