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
  selector: 'app-create-task-step',
  templateUrl: './create-task-step.component.html',
  styleUrls: ['./create-task-step.component.css']
})
export class CreateTaskStepComponent implements OnInit {

  id:any;
  checklistDetails:any;
  imageUrl: any;
  stepCha: any;
  hasTask: any;

  constructor() { }

  ngOnInit() {

  }

}
