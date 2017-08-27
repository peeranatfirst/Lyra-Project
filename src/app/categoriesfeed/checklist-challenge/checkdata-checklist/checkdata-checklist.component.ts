import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { routing } from '../../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AddMoneyService } from 'app/services/add-money.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-checkdata-checklist',
  templateUrl: './checkdata-checklist.component.html',
  styleUrls: ['./checkdata-checklist.component.css']
})
export class CheckdataChecklistComponent implements OnInit {

  id: any;
  checklistChaDetail:any;


  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private addmoney: AddMoneyService) { }

  ngOnInit() {
     // Get id
     this.id = this.route.snapshot.params['id'];
     this.firebaseService.getChecklistChallengeDetails(this.id).subscribe(checklistDetail =>{
       this.checklistChaDetail = checklistDetail ;
     })
  }

}
