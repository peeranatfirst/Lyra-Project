import { Component, OnInit } from '@angular/core';
import { routing } from '../../../app.routing';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { Location } from "@angular/common";
import $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private userinfo: GetUserInfoService,
    private location: Location,
    private modalService: NgbModal) { }

  ngOnInit() {

    //open comment
    $(document).ready(function () {
      $("#commentBt").click(function () {
        document.getElementById('card-comment').style.display = '';
      })

      $("#closeBt").click(function () {
        document.getElementById('transaction').style.display = 'none';
      })
    });

    // Get id
    this.id = this.route.snapshot.params['id'];
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
      if(this.uid == currentUser){
        this.isOwner = true;
      }else{
        this.isOwner = false;
      }

      this.userinfo.getUserInfo(this.uid).subscribe(info => {
        this.info = info;
        this.displayName = this.info.name;
        this.ownerPhoto = this.info.pathPhoto;
      });
    });

    this.firebaseService.getTasksOfChecklistChallenge(this.id).subscribe(tasks => {
      this.tasks = tasks;
    });




  }

  onBack() {
    this.location.back();
  }

  onDeleteChallenge(){
    firebase.database().ref('/AllChallenge/'+this.id).remove();
    this.routing.navigate(['checklistChallenge/']);
}
  open(content) {
    this.modalService.open(content);
  }

 

}
