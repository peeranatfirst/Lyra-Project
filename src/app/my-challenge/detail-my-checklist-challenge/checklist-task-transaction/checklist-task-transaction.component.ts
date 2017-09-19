import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { DatetimestampService } from 'app/services/datetimestamp.service';
import * as firebase from 'firebase';
import { routing } from '../../../app.routing';
import { FirebaseService } from "app/services/firebase.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaskManageService } from "app/services/task-manage.service";
import { AngularFire } from "angularfire2";

@Component({
  selector: 'app-checklist-task-transaction',
  templateUrl: './checklist-task-transaction.component.html',
  styleUrls: ['./checklist-task-transaction.component.css']
})
export class ChecklistTaskTransactionComponent implements OnInit {
  id: any;
  uid: any;
  taskHistory: any[];

  constructor(private location: Location,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private af: AngularFire) { }

  ngOnInit() {

    // Get ID
    this.id = this.route.snapshot.params['id'];
    this.uid = firebase.auth().currentUser.uid;
    this.taskHistory = new Array();

    this.af.auth.subscribe(auth => {
      let tKey, imgPath, tName, dateStamp, lev, timeStamp, caption;
      if (auth) {
        const query = firebase.database().ref("users/" + this.uid + "/Challenges/" + this.id + "/tasks").orderByKey();
        query.once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var data = childSnapshot.val();
              var checkImg = data.path;
              var checkCaption = data.caption;
              if (data.taskStatus === "Checked") {
                const storage = firebase.storage();
                const pathRef = storage.ref();

                if (data.path === undefined) {
                  tKey = childSnapshot.key;
                  tName = data.taskName;
                  lev = data.level;
                  dateStamp = this.dt.getDatestamp(data.datetimeStamp);
                  timeStamp = this.dt.getTimestamp(data.datetimeStamp);
                  if (data.caption === undefined) {
                    // console.log("no caption and img");
                    const task = { taskKey: tKey, taskName: tName, level: lev, date: dateStamp, time: timeStamp, capt: "undefined", img: "undefined" };
                    this.taskHistory.push(task);
                  } else {
                    // console.log("no img");
                    caption = data.caption;
                    const task = { taskKey: tKey, taskName: tName, level: lev, date: dateStamp, time: timeStamp, capt: caption, img: "undefined" };
                    this.taskHistory.push(task);
                  }

                } else {
                  const promise = new Promise((resolve, reject) => {
                    resolve(pathRef.child(checkImg).getDownloadURL());
                  });
                  promise.then((res) => {
                    imgPath = res;
                    return imgPath;
                  }).then((res) => {
                    tKey = childSnapshot.key;
                    tName = data.taskName;
                    lev = data.level;
                    dateStamp = this.dt.getDatestamp(data.datetimeStamp);
                    timeStamp = this.dt.getTimestamp(data.datetimeStamp);

                    if (data.caption === undefined) {
                      // console.log("no caption");
                      const task = { taskKey: tKey, taskName: tName, level: lev, date: dateStamp, time: timeStamp, capt: "undefined", img: imgPath };
                      this.taskHistory.push(task);
                    } else {
                      // console.log("have both");
                      caption = data.caption;
                      const task = { taskKey: tKey, taskName: tName, level: lev, date: dateStamp, time: timeStamp, capt: caption, img: imgPath };
                      this.taskHistory.push(task);

                    }
                  })
                }
              }
              // console.log(this.taskHistory);
            });
          })
      }
    })


  }

  onBack(){
    this.location.back();
  }

}
