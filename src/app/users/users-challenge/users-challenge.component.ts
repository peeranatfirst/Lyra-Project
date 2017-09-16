import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from '../../services/datetimestamp.service';
import { AngularFire } from "angularfire2";

@Component({
  selector: 'app-users-challenge',
  templateUrl: './users-challenge.component.html',
  styleUrls: ['./users-challenge.component.css']
})
export class UsersChallengeComponent implements OnInit {

  Challenge: any[];

  constructor(private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private af: AngularFire) { }

  ngOnInit() {
    this.Challenge = new Array();
    let imgPath;
    this.af.auth.subscribe(auth =>{
      let key, name, chaDes, owner, category, date, time, path;
      
      if(auth){   
            
        const query = firebase.database().ref("AllChallenge").orderByKey();
        query.once("value")
        
          .then((snapshot)=> {
            snapshot.forEach((childSnapshot) => {
              key = childSnapshot.key;
              const subQuery = firebase.database().ref("AllChallenge/"+key).orderByKey();
              subQuery.once("value")
                .then((thirdSnapshot)=>{
                  var data = thirdSnapshot.val();
                  var user = auth.uid;
                  if(data.owner === user){
                    path = data.path;
                    const storage = firebase.storage();
                    const pathRef = storage.ref();
                    const promise = new Promise((resolve, reject)=> {
                        resolve(pathRef.child(path).getDownloadURL());
                    });
                    promise.then((res) => {
                        imgPath =  res ; 
                        return imgPath ;
                    }).then((res) => {
                        name = data.challengeName;
                        chaDes = data.challengeDescription;
                        owner = data.owner;
                        category = data.category;
                        date = this.dt.getDatestamp(data.datetimestamp);
                        time = this.dt.getTimestamp(data.datetimestamp);
                        const obj = {chaId: key, chaName: name, description: chaDes, thisDay: date, thisTime: time, imgSRC: imgPath, cate: category, ownId: owner};
                        this.Challenge.push(obj);
                    }) 
                  }
                }) 
            });
          })
      }
    });
  }

}
