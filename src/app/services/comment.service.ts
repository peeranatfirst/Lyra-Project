import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatetimestampService } from "app/services/datetimestamp.service";
import { GetUserInfoService } from "app/services/get-user-info.service";

@Injectable()
export class CommentService {
  comments: any[];

  constructor(private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private user: GetUserInfoService) { }

    // Function for Add New Comment on Challenge
    AddComment(challengeID, comment){
      firebase.database().ref('/AllChallenge/'+challengeID+'/comments').push(comment);
    }

    getCommentofChallenge(challengeID){
      this.comments = new Array();
      var date, time, username, comment, pathPhoto;
      const query = firebase.database().ref("AllChallenge/" + challengeID + "/comments").orderByChild("datetimestamp");
      query.once("value")
        .then((snapshot) => {
          snapshot.forEach(element => {
            var data = element.val();
            comment = data.comment;
            date = this.dt.getDatestamp(data.datetimestamp);
            time = this.dt.getTimestamp(data.datetimestamp);
            username = data.displayName;
            pathPhoto = data.pathPic
            this.comments.push({user: username, pathPic: pathPhoto, text: comment, dateStamp: date, timeStamp: time});

            /*const promise = new Promise((resolve, reject) => {
              
              this.user.getUserInfo(data.owner).subscribe(info =>{
                username = info.name;
                pathPhoto = info.pathPhoto;
                console.log(username);
                console.log(pathPhoto);
                console.log("do promise");
              })
            }).then(() =>{
              this.comments.push({user: username, pathPic: pathPhoto, text: comment, dateStamp: date, timeStamp: time});
              console.log("do then");
            })
            */
          });
        });
       // console.log(this.comments);
      return this.comments;
    }

}
