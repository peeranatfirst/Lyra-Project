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
  selector: 'app-steps-transaction',
  templateUrl: './steps-transaction.component.html',
  styleUrls: ['./steps-transaction.component.css']
})
export class StepsTransactionComponent implements OnInit {

  id: any;
  uid: any;
  stepHistory: any[];

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
    this.stepHistory = new Array();

    this.af.auth.subscribe(auth => {
      let sKey, imgPath, sNo , sName, dateStamp, timeStamp, caption;
      if (auth) {
        const query = firebase.database().ref("users/" + this.uid + "/Challenges/" + this.id + "/steps").orderByKey();
        query.once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var data = childSnapshot.val();
              var checkImg = data.path;
              var checkCaption = data.caption;
              if (data.stepStatus === "checked") {
                const storage = firebase.storage();
                const pathRef = storage.ref();

                if (data.path === undefined) {
                  sKey = childSnapshot.key;
                  sName = data.stepName;
                  sNo = data.stepNo;
                  dateStamp = this.dt.getDatestamp(data.datetimeStamp);
                  timeStamp = this.dt.getTimestamp(data.datetimeStamp);
                  if (data.caption === undefined) {
                    // console.log("no caption and img");
                    const step = { stepKey: sKey, stepNo: sNo, stepName: sName, date: dateStamp, time: timeStamp, capt: "undefined", img: "undefined" };
                    this.stepHistory.push(step);
                  } else {
                    // console.log("no img");
                    caption = data.caption;
                    const step = { stepKey: sKey, stepNo: sNo, stepName: sName, date: dateStamp, time: timeStamp, capt: caption, img: "undefined" };
                    this.stepHistory.push(step);
                  }

                } else {
                  const promise = new Promise((resolve, reject) => {
                    resolve(pathRef.child(checkImg).getDownloadURL());
                  });
                  promise.then((res) => {
                    imgPath = res;
                    return imgPath;
                  }).then((res) => {
                    sKey = childSnapshot.key;
                    sName = data.stepName;
                    sNo = data.stepNo;
                    dateStamp = this.dt.getDatestamp(data.datetimeStamp);
                    timeStamp = this.dt.getTimestamp(data.datetimeStamp);

                    if (data.caption === undefined) {
                      // console.log("no caption");
                      const step = { stepKey: sKey, stepNo: sNo, stepName: sName, date: dateStamp, time: timeStamp, capt: "undefined", img: imgPath };
                      this.stepHistory.push(step);
                    } else {
                      // console.log("have both");
                      caption = data.caption;
                      const step = { stepKey: sKey, stepNo: sNo, stepName: sName, date: dateStamp, time: timeStamp, capt: caption, img: imgPath };
                      this.stepHistory.push(step);

                    }
                  })
                }
              }
            });
          })
      }
    })

  }

  onBack(){
    this.location.back();
  }

}
