import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class TaskManageService {
  amount: any;
  checklistDetails:any;
  tasks:any;
  uid: any;


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
      resolve(firebase.database().ref('/users/'+this.uid+'/Challenges').push().key);
    }).then((val) => {
      firebase.database().ref('/users/'+ this.uid +'/Challenges/'+val).set(this.checklistDetails);
      return val;
    }).then((val)=>{
      for(var i=0; i<this.tasks.length ;i++){
        const obj = {
          taskName : task[i].taskName,
          level : task[i].level,
          taskStatus : "uncheck"
        }
        firebase.database().ref('/users/'+this.uid+'/Challenges/'+val).child('tasks').push(obj);
      }
    });

    return "should be fix";
    
  }

  checkTask(uid, chaId, taskId){
    let stamp = firebase.database.ServerValue.TIMESTAMP;
    const status = {
      taskStatus: "Checked",
      datetimeStamp: stamp
    };
    firebase.database().ref('/users/'+uid+'/Challenges/' + chaId+'/tasks/'+taskId).update(status);
  }

  checkTaskWithCaptionNoImage(uid, chaId, taskId, cap){
    let stamp = firebase.database.ServerValue.TIMESTAMP;
    const status = {
      taskStatus: "Checked",
      caption: cap,
      datetimeStamp: stamp
    }
    firebase.database().ref('/users/'+uid+'/Challenges/' + chaId+'/tasks/'+taskId).update(status);
  }

  checkTaskWithImage(uid, chaId,taskId, cap){
    const storageRef = firebase.storage().ref(); 
    
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const path = `/ChecklistReview/${chaId}${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        cap.image = selectedFile.name;
        cap.path = path;
        const promise = new Promise((resolve, reject) => {
          // resolve(firebase.database().ref('/AllChallenge').push().key);
          resolve(firebase.database().ref('/users/'+uid+'/Challenges/' + chaId+'/tasks/'+taskId).update(cap));
        }).then((val) => {
          // firebase.database().ref('/AllChallenge/' + val).set(createSavingmoneyChallenge);
          return val;
        })
      });
    }
  }
}
