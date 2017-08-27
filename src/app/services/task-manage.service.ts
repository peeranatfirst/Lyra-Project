import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class TaskManageService {

  constructor(
    private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute) { 
  }




}
