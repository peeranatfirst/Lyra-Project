import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {
  categories: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { }

  getCategories() {
    this.categories = this.af.database.list('/categories') as FirebaseListObservable<Categories[]>
    return this.categories;
  }

}

interface Categories {
  $key?: string;
  categories;
}