import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { AngularFire } from 'angularfire2';



@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.css']
})
export class MyFavoriteComponent implements OnInit {

  currentUserId: any;
  listOfFavChallenge: any[];

  constructor(private firebaseService: FirebaseService,
    private dt: DatetimestampService,
    public af: AngularFire,
    private getinfo: GetUserInfoService) { }

  ngOnInit() {
    var listOfFavorite = new Array();
    this.currentUserId = firebase.auth().currentUser.uid;
    const query = firebase.database().ref("users/" + this.currentUserId + "/favorite");
    query.once("value")
      .then((snapshot) => {
        snapshot.forEach(element => {
          var data = element.key;
          listOfFavorite.push(data);
          // console.log("do loop");
        })
        return listOfFavorite;
      }).then((val) => {
        // console.log(val);
        this.listOfFavChallenge = new Array();
        let key, name, path, datestamp, timestamp, category, owner;
        for (var i = 0; i < val.length; i++) {
          var getCha = firebase.database().ref("AllChallenge/" + val[i]);
          getCha.once("value")
            .then((snapshot) => {
              key = snapshot.key;
              name = snapshot.val().challengeName;
              path = snapshot.val().path;
              datestamp = this.dt.getDatestamp(snapshot.val().datetimestamp);
              timestamp = this.dt.getTimestamp(snapshot.val().datetimestamp);
              category = snapshot.val().category;
              owner = snapshot.val().owner;
              var obj = {
                key: key,
                chaName: name,
                category: category,
                path: path,
                date: datestamp,
                time: timestamp,
                owner: owner
              }
              return obj;
            }).then((obj) => {
              let imgPath;
              const pathRef = firebase.storage().ref();
              const promise = new Promise((resolve, reject) => {
                resolve(pathRef.child(obj.path).getDownloadURL());
              });
              promise.then((res) => {
                imgPath = res;
                return imgPath;
              }).then((res) => {
                this.listOfFavChallenge.push({ chaId: obj.key, chaName: obj.chaName, time: obj.time, imgSRC: imgPath, date: obj.date, categories: obj.category, owner: obj.owner });
              });
            }
          )}
      })
      
    }
}
