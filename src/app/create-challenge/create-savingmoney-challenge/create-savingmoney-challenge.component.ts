import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import { CreateChallengesService } from 'app/services/create-challenges.service';
import { routing } from '../../app.routing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import * as firebase from 'firebase';
import $ from 'jquery';

@Component({
  selector: 'app-create-savingmoney-challenge',
  templateUrl: './create-savingmoney-challenge.component.html',
  styleUrls: ['./create-savingmoney-challenge.component.css']
})
export class CreateSavingmoneyChallengeComponent implements OnInit {
  challengeName: any;
  challengeDescription: any;
  duration: any;
  totalAmount: any;
  image: any;


  constructor(
    private createCha: CreateChallengesService,
    private router: Router,
    private route: ActivatedRoute,
    private dt: DatetimestampService
  ) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.blockloadergrey').hide();
      $('.blockloaderwhite').hide();
      $('#create').click(function () {
        var x = document.forms["createSav"]["totalAmount"].value;
        if (x.checkValidity() == true) {
          $('.blockloadergrey').show();
          $('.blockloaderwhite').show();
          $('.blockloaderwhite').addClass('animated zoomIn');
          setTimeout(disableScroll(), 5000);
        }
      })
    });
    function disableScroll() {
      $("body").css('overflow', 'hidden');
    }
    $('#create').bind("click", function () {
      var imgVal = $('#uploadfile').val();
      if (imgVal == '') {
        alert("Please, upload a photo!");
        return false;
      }
    });
  }

  // Recieve an information from create challenge form when click submit. 
  onAddSubmit() {
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    const createSavingmoneyChallenge = {
      challengeName: this.challengeName,
      challengeDescription: this.challengeDescription,
      duration: this.duration,
      totalAmount: this.totalAmount,
      datetimestamp: timestamp,
      category: "SavingMoney",
      owner: firebase.auth().currentUser.uid
    };

    const createSavingmoneyChallengeNoDescrip = {
      challengeName: this.challengeName,
      duration: this.duration,
      totalAmount: this.totalAmount,
      datetimestamp: timestamp,
      category: "SavingMoney",
      owner: firebase.auth().currentUser.uid
    };

    if (this.challengeDescription === undefined) {
      this.createCha.addCreateSavingmoneyChallenge(createSavingmoneyChallengeNoDescrip);
    } else {
      this.createCha.addCreateSavingmoneyChallenge(createSavingmoneyChallenge);
    }


  }




}


