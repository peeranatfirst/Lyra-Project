import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { routing } from '../app.routing';
import $ from 'jquery';
@Component({
  selector: 'app-categoriesfeed',
  templateUrl: './categoriesfeed.component.html',
  styleUrls: ['./categoriesfeed.component.css']
})
export class CategoriesfeedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('#carousel-example-1').hammer().on('swipeleft', function () {
        $(this).carousel('next');
      })
      $('#carousel-example-1').hammer().on('swiperight', function () {
        $(this).carousel('prev');
      })
    });
  }

}
