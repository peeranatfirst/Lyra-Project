import { Component, OnInit } from '@angular/core';
import { routing } from '../../../app.routing';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { Location } from "@angular/common";
import $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from "app/services/comment.service";
import { AngularFire } from 'angularfire2';

import { FavoriteService } from "app/services/favorite.service";

@Component({
  selector: 'app-detail-checklist',
  templateUrl: './detail-checklist.component.html',
  styleUrls: ['./detail-checklist.component.css']
})
export class DetailChecklistComponent implements OnInit {

  id: any;
  checklistChaDetail: any;
  datestamp: any;
  timestamp: any;
  imageUrl: any;
  info: any;
  displayName: any;
  ownerPhoto: any;
  tasks: any;

  uid: any;
  isOwner: any;

  comment: any;
  comments: any; // Array of all comment in this challenge
  currentUserPhoto: any;
  currentUserName: any;
  commentsNum: any;

  isFavorited: any;
  favNum: any;

  constructor(
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private userinfo: GetUserInfoService,
    private location: Location,
    private cm: CommentService,
    private fav: FavoriteService,
    private modalService: NgbModal,
    public af: AngularFire, ) { }

  ngOnInit() {

    //open comment
    $(document).ready(function () {

      var resizingTextareas = [].slice.call(document.querySelectorAll('textarea[autoresize]'));

      resizingTextareas.forEach(function (textarea) {
        textarea.addEventListener('input', autoresize, false);
      });

      function autoresize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
        this.scrollTop = this.scrollHeight;
      }
      $("#commentBt").click(function () {
        document.getElementById('card-comment').style.display = '';
      })
      $("#closeBt").click(function () {
        document.getElementById('card-comment').style.display = 'none';
      })

      $("body").css('overflow', 'scroll');
    });

    // Get id
    this.id = this.route.snapshot.params['id'];
    this.countComment();
    this.isFavorite();
    this.countFavorited();
    this.firebaseService.getChecklistChallengeDetails(this.id).subscribe(checklist => {
      this.checklistChaDetail = checklist;

      this.datestamp = this.dt.getDatestamp(this.checklistChaDetail.datetimestamp);
      this.timestamp = this.dt.getTimestamp(this.checklistChaDetail.datetimestamp);

      const storageRef = firebase.storage().ref();
      const spaceRef = storageRef.child(checklist.path);
      storageRef.child(checklist.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      });

      this.uid = this.checklistChaDetail.owner;
      var currentUser = firebase.auth().currentUser.uid;
      if (this.uid == currentUser) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }

      this.userinfo.getUserInfo(this.uid).subscribe(info => {
        this.info = info;
        this.displayName = this.info.name;
        this.ownerPhoto = this.info.pathPhoto;
      });

      this.af.auth.subscribe(auth => {
        if (auth) {
          this.currentUserPhoto = auth.auth.photoURL;
          this.currentUserName = auth.auth.displayName;
        }
      });

    });

    this.firebaseService.getTasksOfChecklistChallenge(this.id).subscribe(tasks => {
      this.tasks = tasks;
    });


    this.comments = this.cm.getCommentofChallenge(this.id);

  }

  onBack() {
    this.location.back();
  }

  onDeleteChallenge() {
    const query = firebase.database().ref('/AllChallenge/' + this.id + '/favorite');
    query.once("value")
      .then((snapshot) => {
        snapshot.forEach(element => {
          var user = element.key;
          firebase.database().ref('/users/' + user + '/favorite/' + this.id).remove();
        });
      }).then((res)=>{
        firebase.database().ref('/AllChallenge/' + this.id).remove();
        this.routing.navigate(['checklistChallenge/']);
      });
  }
  
  open(content) {
    this.modalService.open(content);
  }

  onCommentSubmit() {
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    const createComment = {
      comment: this.comment,
      datetimestamp: timestamp,
      owner: firebase.auth().currentUser.uid,
      pathPic: this.currentUserPhoto,
      displayName: this.currentUserName
    };

    this.cm.AddComment(this.id, createComment);
    this.comments = this.cm.getCommentofChallenge(this.id);
    this.countComment();
  }

  countComment() {
    const query = firebase.database().ref("AllChallenge/" + this.id);
    query.once("value")
      .then((snapshot) => {
        let childrenCM = snapshot.child("comments").numChildren();
        if (childrenCM === undefined) {
          this.commentsNum = 0;
        } else {
          this.commentsNum = childrenCM;
        }
      })
  }

  favorite() {
    var currentUser = firebase.auth().currentUser.uid;
    this.fav.favorite(this.id, currentUser);
    this.isFavorite();
    this.countFavorited();
  }

  unfavorite() {
    var currentUser = firebase.auth().currentUser.uid;
    this.fav.unfavorite(this.id, currentUser);
    this.isFavorite();
    this.countFavorited();
  }

  isFavorite() {
    var currentUser = firebase.auth().currentUser.uid;
    const query = firebase.database().ref("users/" + currentUser + "/favorite");
    query.once("value")
      .then((snapshot) => {
        this.isFavorited = snapshot.hasChild(this.id); // true
      })
  }

  countFavorited() {
    const query = firebase.database().ref("AllChallenge/" + this.id);
    query.once("value")
      .then((snapshot) => {
        let childrenFav = snapshot.child("favorite").numChildren();
        if (childrenFav === undefined) {
          this.favNum = 0;
        } else {
          this.favNum = childrenFav;
        }
      })
  }

}
