import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { DatetimestampService } from 'app/services/datetimestamp.service';
import * as firebase from 'firebase';
import { CalculatePercentSuccessService } from 'app/services/calculate-percent-success.service';
import { routing } from '../../app.routing';
import { FirebaseService } from "app/services/firebase.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaskManageService } from "app/services/task-manage.service";
import { AddMoneyService } from "app/services/add-money.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-my-routine-challenge',
  templateUrl: './detail-my-routine-challenge.component.html',
  styleUrls: ['./detail-my-routine-challenge.component.css']
})
export class DetailMyRoutineChallengeComponent implements OnInit {

  id: any;
  uid: any;
  detailMyChallenge: any;
  startDate: any;
  imgURL: any;
  percent: any;

  tasks: any;
  scheduled: any[];

  totalTask: any;
  remaining : any;

  chaId: any;

  constructor(private location: Location,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService,
    private calculate: CalculatePercentSuccessService,
    private taskmanage: TaskManageService,
    private addmoney: AddMoneyService,
    private modalService: NgbModal) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    this.uid = firebase.auth().currentUser.uid;

    this.firebaseService.getDetailMyCLChallenge(this.uid, this.id).subscribe(detailMyChallenge => {
      this.detailMyChallenge = detailMyChallenge;
      this.chaId = detailMyChallenge.$key;
      this.startDate = this.dt.getDatestamp(this.detailMyChallenge.startDate); // convert timestamp to date
      this.getImgURL(this.detailMyChallenge.path);
      this.percent = this.detailMyChallenge.percent;
    })

    
    this.scheduled = new Array();
    
    const query = firebase.database().ref("users/" + this.uid +"/Challenges/" + this.chaId +"/scheduled" ).orderByChild("dayNo");
    query.once("value")
      .then((snapshot)=>{
        let checked = 0;
        snapshot.forEach(element =>{
          var data = element.val();
          const dailyEvent = {
            key: element.$key,
            dayNo: data.dayNo,
            scheduleDate: data.scheduleDate,
            status: data.status
          }
          this.scheduled.push(dailyEvent);
          if(data.status == 'locked'){
            checked = checked + 1;
          }
        })
        this.remaining = checked;
      })
  }

  onBack() {
    this.location.back();
  }

  getImgURL(path) {
    const storage = firebase.storage();
    const pathRef = storage.ref().child(path).getDownloadURL().then((val) => {
      this.imgURL = val;
    });
  }

  onCancelChallenge() {
    this.addmoney.cancelChallengeUpdate(this.uid, this.chaId);
    this.router.navigate(['/mychallenge']);
  }

  onDeleteChallenge() {
    this.addmoney.deleteChallenge(this.uid, this.chaId);
    this.router.navigate(['/mychallenge']);
  }

  open(content) {
    this.modalService.open(content);
  }

}
