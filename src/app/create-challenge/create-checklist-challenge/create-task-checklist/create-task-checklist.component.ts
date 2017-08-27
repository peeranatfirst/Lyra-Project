import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { AngularFire } from 'angularfire2';
import { routing } from '../../../app.routing';
import { FirebaseService } from 'app/services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { GetUserInfoService } from "app/services/get-user-info.service";

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

  constructor(
    private firebaseService: FirebaseService,
    private routing: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private userinfo: GetUserInfoService) { }

  ngOnInit() {

    // Get id
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getChecklistChallengeDetails(this.id).subscribe((checklistDetails)=>{
      this.checklistDetails = checklistDetails;

      const storageRef = firebase.storage().ref();
      const spaceRef = storageRef.child(checklistDetails.path);
      storageRef.child(checklistDetails.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      });

    });

    var ref = firebase.database().ref("/AllChallenge");
    ref.once("value")
    .then(function(snapshot) {
      var hasTask = snapshot.hasChild("tasks"); 
      console.log("do this1");
    }).then((hasTask)=>{
      console.log("do this2");
      if(hasTask){
       this.hasTask = "has some Task";
      }else{
        this.hasTask = "There is no task in this challenge";
      }
    });



    /*$(document).ready(function () {
      var max_fields = 10; //maximum input boxes allowed
      var wrapper = $(".input_fields_wrap"); //Fields wrapper
      var add_button = $(".add_field_button"); //Add button ID

      var x = 1; //initlal text box count
      $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
          x++; //text box increment
          $(wrapper).append('<div><a href="#" class="remove_field remove"><small>Remove Task</small></a><input type="text" class="form-control" name="challengeName" required minlength="5"></div>'); //add input box
        }
      });

      $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
      })
    });*/
  }

  onAddSubmit(){
      
  }

}
