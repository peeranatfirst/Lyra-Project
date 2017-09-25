import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import $ from 'jquery';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  userImg: any;
  constructor(
    public af: AngularFire,
    private router: Router,
    public flashMessage: FlashMessagesService
  ) {
    
       this.af.auth.subscribe(auth =>{
      if(auth){
        this.user = auth;
        this.userImg = auth.auth.photoURL;
      }
    });
   }

  login() {
    this.router.navigateByUrl('/login');
    
  }

  logout() {
    this.af.auth.logout();
    this.flashMessage.show('You are logged out',
      { cssClass: 'alert-success', timeout: 3000 });
  }

  ngOnInit() {

    $(document).ready(function () {
      //open menu list
      $(".fa-bars").click(function () {
        $(".menu").removeClass('menuClose');
        $(".menu").addClass('menuOpen');

        $(".mainClose").addClass('mainOpen');
        $(".mainOpen").removeClass('mainClose');

        $(".fa-bars").hide(500);
        $(".navbar-brand").hide(500);
        $(".fa-times").show(500);

        $(".notification").removeClass('notiOpen');
        $(".notification").addClass('notiClose');
        $(".noti").removeClass('triangle');

        document.getElementById('notiBellId').style.display = "none";
        document.getElementById('notiBellOId').style.display = "";
      });
      
      //close menu list
      $("#menuX").click(function () {
        $(".menu").addClass('menuClose');
        $(".menu").removeClass('menuOpen');

        $(".mainOpen").addClass('mainClose');
        $(".mainClose").removeClass('mainOpen');

        $("#menuX").hide(500);
        $(".fa-bars").show(500);
        $(".navbar-brand").show(500);
      });

      $(".list-group").click(function () {
        $(".menu").addClass('menuClose');
        $(".menu").removeClass('menuOpen');

        $(".mainOpen").addClass('mainClose');
        $(".mainClose").removeClass('mainOpen');

        $("#menuX").hide(500);
        $(".fa-bars").show(500);
        $(".navbar-brand").show(500);
      });
      //

      $(".list-item").click(function () {
        $(".menu").addClass('menuClose');
        $(".menu").removeClass('menuOpen');

        $(".mainOpen").addClass('mainClose');
        $(".mainClose").removeClass('mainOpen');

        $("#menuX").hide(500);
        $(".fa-bars").show(500);
        $(".navbar-brand").show(500);
      });

      $(".fa-search").click(function () {
        $(".search").removeClass('searchClose');
        $(".search").addClass('searchOpen');

        $(".menu").addClass('menuClose');
        $(".menu").removeClass('menuOpen');

        $(".mainOpen").addClass('mainClose');
        $(".mainClose").removeClass('mainOpen');

        $("#menuX").hide(500);
        $(".fa-bars").show(500);
        $(".navbar-brand").show(500);

        $(".notification").removeClass('notiOpen');
        $(".notification").addClass('notiClose');
        $(".noti").removeClass('triangle');

        document.getElementById('notiBellId').style.display = "none";
        document.getElementById('notiBellOId').style.display = "";
      });

      $("#searchX").click(function () {
        $(".search").removeClass('searchOpen');
        $(".search").addClass('searchClose');
      });

      $(".fa-bell-o").click(function () {
        $(".notification").removeClass('notiClose');
        $(".notification").addClass('notiOpen');
        $(".noti").addClass('triangle');
        $(".notiNumber").hide(500);

        document.getElementById('notiBellOId').style.display = "none";
        document.getElementById('notiBellId').style.display = "";
      });
    });
    
      $(".fa-bell").click(function () {
        $(".notification").removeClass('notiOpen');
        $(".notification").addClass('notiClose');
        $(".noti").removeClass('triangle');

        document.getElementById('notiBellOId').style.display = "";
        document.getElementById('notiBellId').style.display = "none";
      });
  }

}
