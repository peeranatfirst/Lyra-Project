import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('#MyChallenge-tab').addClass('active');

      $("#MyChallenge-tab").click(function () {
        $('#MyChallenge-tab').addClass('active');
        $('#Favorite-tab').removeClass('active');
        document.getElementById('MyChallenge').style.display = "";
        document.getElementById('Favorite').style.display = "none";
      });

      $("#Favorite-tab").click(function () {
        $('#MyChallenge-tab').removeClass('active');
        $('#Favorite-tab').addClass('active');
        document.getElementById('MyChallenge').style.display = "none";
        document.getElementById('Favorite').style.display = "";
      });
    });
  }

}
