import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from './services/firebase.service';
import { routing } from './app.routing';


import { AppComponent } from './app.component';
import { CategoriesfeedComponent } from './categoriesfeed/categoriesfeed.component';
import { SavingmoneyComponent } from './categoriesfeed/savingmoney/savingmoney.component';
import { NavbarComponent } from './share/navbar/navbar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailSavingMoneyComponent } from './categoriesfeed/savingmoney/detail-saving-money/detail-saving-money.component';

 
export const firebaseConfig = {
  apiKey: "AIzaSyA1LmcZuSQjVmr8QlOBDrcdLkt75Ze0g0E",
  authDomain: "lyra-24b71.firebaseapp.com",
  databaseURL: "https://lyra-24b71.firebaseio.com",
  storageBucket: "lyra-24b71.appspot.com",
  messagingSenderId: "943399750478"

}


@NgModule({
  declarations: [
    AppComponent,
    CategoriesfeedComponent,
    SavingmoneyComponent,
    NavbarComponent,
    DetailSavingMoneyComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    routing

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
