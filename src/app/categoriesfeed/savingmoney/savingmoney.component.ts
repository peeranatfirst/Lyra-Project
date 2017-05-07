import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-savingmoney',
  templateUrl: './savingmoney.component.html',
  styleUrls: ['./savingmoney.component.css']
})
export class SavingmoneyComponent implements OnInit {
  listOfChallenge: any[];
  imageUrl: any;
  id: any;



  constructor(
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute,

  ) { }


  ngOnInit() {
    this.listOfChallenge = new Array();
   
    let imgPath;
    this.firebaseService.getChallengeList().subscribe(challengeList => {
  
      let key,name,totalAmount,des,duration,goal ,path,valnaja;
      for(let addObj of challengeList){
      path = this.firebaseService.getListOfChallengePath(addObj);   

        let storage = firebase.storage();
        let pathRef = storage.ref();
        const promise = new Promise((resolve, reject)=> {
            resolve(pathRef.child(path).getDownloadURL());
        });
        promise.then((res) => {
            imgPath =  res ; 
            return imgPath 
        }).then((res) => {
            key = this.firebaseService.getListOfChallengeId(addObj);
            name = this.firebaseService.getListOfChallengeName(addObj);
            des = this.firebaseService.getListOfChallengeDes(addObj);
            goal = this.firebaseService.getListOfChallengeGoal(addObj);
            duration = this.firebaseService.getListOfChallengeDuration(addObj);
            this.listOfChallenge.push({chaId: key,chaName: name,chaGoal: goal,description:des,time:duration,imgSRC:imgPath});
        });

      }
      console.log(this.listOfChallenge);
      
    })
  }

}