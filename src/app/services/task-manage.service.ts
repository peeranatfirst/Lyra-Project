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
    console.log(checklistdetail);
    const promise = new Promise((resolve, reject) => {
      resolve(firebase.database().ref('/users/'+this.uid+'/Challenges').push().key);
    }).then((val) => {
      console.log(val);
      firebase.database().ref('/users/'+ this.uid +'/Challenges/'+val).set(this.checklistDetails);
      console.log(this.checklistDetails);
      return val;
    }).then((val)=>{
      for(var i=0; i<this.tasks.length ;i++){
        const obj = {
          taskName : task[i].taskName,
          level : task[i].level,
          taskStatus : "undone"
        }
        firebase.database().ref('/users/'+this.uid+'/Challenges/'+val).child('tasks').push(obj);
      }
    });

    return "should be fix";
    
  }


}
