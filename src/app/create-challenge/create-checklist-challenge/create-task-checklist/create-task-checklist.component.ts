import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { AngularFire } from 'angularfire2';
import { routing } from '../../../app.routing';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { CreateChallengesService } from "app/services/create-challenges.service";

@Component({
  selector: 'app-create-task-checklist',
  templateUrl: './create-task-checklist.component.html',
  styleUrls: ['./create-task-checklist.component.css']
})
export class CreateTaskChecklistComponent implements OnInit {
  id:any;
  checklistDetails:any;
  imageUrl: any;
  myTasks: any;
  hasTask: any;

  taskForAdd: any[];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private userinfo: GetUserInfoService,
    private cc: CreateChallengesService) { }

  ngOnInit() {

    // Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getChecklistChallengeDetails(this.id).subscribe((checklistDetails)=>{
      this.checklistDetails = checklistDetails;

    // In case we want to show challenge photo in add task component
    /*const storageRef = firebase.storage().ref();
      const spaceRef = storageRef.child(checklistDetails.path);
      storageRef.child(checklistDetails.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      });*/

    });

    this.taskForAdd = new Array();
  }

  onAddSubmit(formData){
      if(formData.value){
        const taskName = formData.value.taskName;
        const levelOfTask = formData.value.level;
        this.taskForAdd.push({
          taskname: taskName,
          level: levelOfTask
        });
      }
  }

  onAddTask(){
    if(this.taskForAdd[0] !== undefined ){
      console.log("add to database");
      var ref = firebase.database().ref("/AllChallenge"+this.id);
      ref.once("value")
      .then(function(snapshot) {
        var hasTask = snapshot.hasChild("tasks"); 
      }).then((hasTask)=>{
        for(var i=0; i<this.taskForAdd.length ; i++){
          const obj ={
            taskName: this.taskForAdd[i].taskname, 
            level: this.taskForAdd[i].level
          };
          this.cc.addTasksChecklistChallenge(obj, this.id);
        }
      }).then(()=>{
        this.router.navigate(['detailmyChecklistChallenge/'+this.id]);
      })

    }else{
      console.log("nothing to add");

    }
  }

}
