import { Component, OnInit } from '@angular/core';
import { AddMoneyService } from 'app/services/add-money.service';
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from 'app/services/firebase.service';
import * as firebase from 'firebase';

import { Location } from "@angular/common";
import { TaskManageService } from "app/services/task-manage.service";

@Component({
  selector: 'app-done-checklist',
  templateUrl: './done-checklist.component.html',
  styleUrls: ['./done-checklist.component.css']
})
export class DoneChecklistComponent implements OnInit {

  taskCaption: any;
  image: any;
  chaId: any;
  taskId: any;
  uid: any;

  detailTask: any;

  constructor(private location: Location,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private taskmanage: TaskManageService) { }

  ngOnInit() {
    // Get ID
    this.chaId = this.route.snapshot.params['id1'];
    this.taskId = this.route.snapshot.params['id2'];
    this.uid = firebase.auth().currentUser.uid;

    this.firebaseService.getTaskDetail(this.uid,this.chaId,this.taskId).subscribe(detailTask =>{
      this.detailTask = detailTask;
    })
    

  }

  onCheckSubmit(){
    var hasImg = (<HTMLInputElement>document.getElementById("image")).value; 
    let stamp = firebase.database.ServerValue.TIMESTAMP;
    if(hasImg != ""){
      if(this.taskCaption == undefined || this.taskCaption == ""){
        // console.log("image with no caption");
        const cap = {
          taskStatus: "Checked",
          datetimeStamp: stamp
        }
        this.taskmanage.checkTaskWithImage(this.uid,this.chaId,this.taskId, cap);
      }else{
        // console.log("image with caption");
        const cap = {
          taskStatus: "Checked",
          caption: this.taskCaption,
          datetimeStamp: stamp
        }
        this.taskmanage.checkTaskWithImage(this.uid,this.chaId,this.taskId, cap);
      }
    }else{
      if(this.taskCaption == undefined || this.taskCaption == ""){
        // console.log("no image with no caption");
        this.taskmanage.checkTask(this.uid,this.chaId,this.taskId);
      }else{
        // console.log("no image with caption");
        this.taskmanage.checkTaskWithCaptionNoImage(this.uid,this.chaId,this.taskId,this.taskCaption);
        
      }
    }
    this.router.navigate(['/detailmyChecklistchallenge/'+this.chaId]);
  }

  onBack(){
    this.location.back();
  }

}
