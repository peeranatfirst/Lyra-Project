import { Component, OnInit } from '@angular/core';
import { FirebaseService } from  '../services/firebase.service';

@Component({
  selector: 'app-categoriesfeed',
  templateUrl: './categoriesfeed.component.html',
  styleUrls: ['./categoriesfeed.component.css']
})
export class CategoriesfeedComponent implements OnInit {
  categories:any;

  constructor(private FirebaseService:FirebaseService) { }

  ngOnInit() {
    this.FirebaseService.getCategories().subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    })
  }

}
