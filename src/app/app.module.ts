import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { routing } from './app.routing';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Components
import { AppComponent } from './app.component';
import { CategoriesfeedComponent } from './categoriesfeed/categoriesfeed.component';
import { SavingmoneyComponent } from './categoriesfeed/savingmoney/savingmoney.component';
import { NavbarComponent } from './share/navbar/navbar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailSavingMoneyComponent } from './categoriesfeed/savingmoney/detail-saving-money/detail-saving-money.component';
import { MyChallengeComponent } from './my-challenge/my-challenge.component';
import { CheckdataSavingmoneyComponent } from './categoriesfeed/savingmoney/checkdata-savingmoney/checkdata-savingmoney.component';
import { AddMoneyComponent } from './categoriesfeed/savingmoney/add-money/add-money.component';
import { DetailMyChallengeComponent } from './my-challenge/detail-my-challenge/detail-my-challenge.component';
import { CreateSavingmoneyChallengeComponent } from './create-challenge/create-savingmoney-challenge/create-savingmoney-challenge.component';

//Directives
import { ProgressBarDirective } from './my-challenge/progress-bar.directive';

//Services
import { AddMoneyService } from "app/services/add-money.service";
import { FirebaseService } from './services/firebase.service';


export const firebaseConfig = {
  apiKey: "AIzaSyA1LmcZuSQjVmr8QlOBDrcdLkt75Ze0g0E",
  authDomain: "lyra-24b71.firebaseapp.com",
  databaseURL: "https://lyra-24b71.firebaseio.com",
  storageBucket: "lyra-24b71.appspot.com",
  messagingSenderId: "943399750478"

}

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};


@NgModule({
  declarations: [
    AppComponent,
    CategoriesfeedComponent,
    SavingmoneyComponent,
    NavbarComponent,
    DetailSavingMoneyComponent,
    MyChallengeComponent,
    CheckdataSavingmoneyComponent,
    AddMoneyComponent,
    AddMoneyComponent,
    DetailMyChallengeComponent,
    CreateSavingmoneyChallengeComponent,
    ProgressBarDirective


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    routing,
    FlashMessagesModule

  ],
  providers: [
    FirebaseService,
    AddMoneyService
    ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
