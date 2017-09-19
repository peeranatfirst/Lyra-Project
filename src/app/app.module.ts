import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { routing } from './app.routing';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Component
import { AppComponent } from './app.component';
import { CategoriesfeedComponent } from './categoriesfeed/categoriesfeed.component';
import { SavingmoneyComponent } from './categoriesfeed/savingmoney/savingmoney.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailSavingMoneyComponent } from './categoriesfeed/savingmoney/detail-saving-money/detail-saving-money.component';
import { MyChallengeComponent } from './my-challenge/my-challenge.component';
import { CheckdataSavingmoneyComponent } from './categoriesfeed/savingmoney/checkdata-savingmoney/checkdata-savingmoney.component';
import { AddMoneyComponent } from './categoriesfeed/savingmoney/add-money/add-money.component';
import { DetailMySavingmoneyChallengeComponent } from './my-challenge/detail-my-savingmoney-challenge/detail-my-savingmoney-challenge.component';
import { CreateSavingmoneyChallengeComponent } from './create-challenge/create-savingmoney-challenge/create-savingmoney-challenge.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { EmailComponent } from './authentication/email/email.component';


//Directives

//Services
import { AddMoneyService } from 'app/services/add-money.service';
import { FirebaseService } from './services/firebase.service';
import { SelectCategoryComponent } from './create-challenge/select-category.component';
import { DatetimestampService } from 'app/services/datetimestamp.service';
import { CreateChallengesService } from 'app/services/create-challenges.service';
import { CalculatePercentSuccessService } from 'app/services/calculate-percent-success.service';
import { GetUserInfoService } from "app/services/get-user-info.service";
import { TaskManageService } from "app/services/task-manage.service";
import { AuthGuard } from './services/auth.service';
import { CreateChecklistChallengeComponent } from './create-challenge/create-checklist-challenge/create-checklist-challenge.component';
import { ChecklistChallengeComponent } from './categoriesfeed/checklist-challenge/checklist-challenge.component';
import { DetailChecklistComponent } from './categoriesfeed/checklist-challenge/detail-checklist/detail-checklist.component';
import { DetailMyChecklistChallengeComponent } from './my-challenge/detail-my-checklist-challenge/detail-my-checklist-challenge.component';
import { StepChallengeComponent } from './categoriesfeed/step-challenge/step-challenge.component';
import { RoutineChallengeComponent } from './categoriesfeed/routine-challenge/routine-challenge.component';
import { CreateTaskChecklistComponent } from './create-challenge/create-checklist-challenge/create-task-checklist/create-task-checklist.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CheckdataChecklistComponent } from "app/categoriesfeed/checklist-challenge/checkdata-checklist/checkdata-checklist.component";
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { UsersChallengeComponent } from './users/users-challenge/users-challenge.component';
import { UserDetailComponent } from './users/user-profile/user-detail/user-detail.component';
import { DoneChecklistComponent } from './my-challenge/detail-my-checklist-challenge/done-checklist/done-checklist.component';
import { ChecklistTaskTransactionComponent } from './my-challenge/detail-my-checklist-challenge/checklist-task-transaction/checklist-task-transaction.component';


export const firebaseConfig = {
  apiKey: "AIzaSyA1LmcZuSQjVmr8QlOBDrcdLkt75Ze0g0E",
  authDomain: "lyra-24b71.firebaseapp.com",
  databaseURL: "https://lyra-24b71.firebaseio.com",
  storageBucket: "lyra-24b71.appspot.com",
  messagingSenderId: "943399750478"
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
    DetailMySavingmoneyChallengeComponent,
    CreateSavingmoneyChallengeComponent,
    SelectCategoryComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    CreateChecklistChallengeComponent,
    ChecklistChallengeComponent,
    DetailChecklistComponent,
    DetailMyChecklistChallengeComponent,
    StepChallengeComponent,
    RoutineChallengeComponent,
    CreateTaskChecklistComponent,
    UserProfileComponent,
    CheckdataChecklistComponent,
    EditProfileComponent,
    UsersChallengeComponent,
    UserDetailComponent,
    DoneChecklistComponent,
    ChecklistTaskTransactionComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
    FlashMessagesModule,
    BrowserAnimationsModule

  ],
  providers: [
    FirebaseService,
    AddMoneyService,
    DatetimestampService,
    CreateChallengesService,
    CalculatePercentSuccessService,
    AuthGuard,
    GetUserInfoService,
    TaskManageService
    ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
