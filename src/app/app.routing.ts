import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { CategoriesfeedComponent } from './categoriesfeed/categoriesfeed.component';
import { SavingmoneyComponent } from './categoriesfeed/savingmoney/savingmoney.component';
import { DetailSavingMoneyComponent } from './categoriesfeed/savingmoney/detail-saving-money/detail-saving-money.component';
import { MyChallengeComponent } from './my-challenge/my-challenge.component';
import { CheckdataSavingmoneyComponent } from './categoriesfeed/savingmoney/checkdata-savingmoney/checkdata-savingmoney.component';
import { DetailMySavingmoneyChallengeComponent } from './my-challenge/detail-my-savingmoney-challenge/detail-my-savingmoney-challenge.component';
import { AddMoneyComponent } from './categoriesfeed/savingmoney/add-money/add-money.component';
import { CreateSavingmoneyChallengeComponent } from './create-challenge/create-savingmoney-challenge/create-savingmoney-challenge.component';
import { SelectCategoryComponent } from './create-challenge/select-category.component';

import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './services/auth.service';
import { SignupComponent } from './authentication/signup/signup.component';
import { EmailComponent } from './authentication/email/email.component';
import { ChecklistChallengeComponent } from "app/categoriesfeed/checklist-challenge/checklist-challenge.component";
import { DetailChecklistComponent } from "app/categoriesfeed/checklist-challenge/detail-checklist/detail-checklist.component";
import { CreateChecklistChallengeComponent } from "app/create-challenge/create-checklist-challenge/create-checklist-challenge.component";
import { DetailMyChecklistChallengeComponent } from "app/my-challenge/detail-my-checklist-challenge/detail-my-checklist-challenge.component";
import { StepChallengeComponent } from "app/categoriesfeed/step-challenge/step-challenge.component";
import { RoutineChallengeComponent } from "app/categoriesfeed/routine-challenge/routine-challenge.component";
import { CreateTaskChecklistComponent } from "app/create-challenge/create-checklist-challenge/create-task-checklist/create-task-checklist.component";
import { CheckdataChecklistComponent } from "app/categoriesfeed/checklist-challenge/checkdata-checklist/checkdata-checklist.component";
import { UserProfileComponent } from "app/users/user-profile/user-profile.component";
import { DoneChecklistComponent } from "app/my-challenge/detail-my-checklist-challenge/done-checklist/done-checklist.component";
import { ChecklistTaskTransactionComponent } from "app/my-challenge/detail-my-checklist-challenge/checklist-task-transaction/checklist-task-transaction.component";

import { DetailStepComponent } from "app/categoriesfeed/step-challenge/detail-step/detail-step.component";
import { CreateStepChallengeComponent } from "app/create-challenge/create-step-challenge/create-step-challenge.component";
import { CreateTaskStepComponent } from "app/create-challenge/create-step-challenge/create-task-step/create-task-step.component";
import { CheckdataStepComponent } from "app/categoriesfeed/step-challenge/checkdata-step/checkdata-step.component";
import { DetailMyStepChallengeComponent } from "app/my-challenge/detail-my-step-challenge/detail-my-step-challenge.component";
import { DoneStepComponent } from "app/my-challenge/detail-my-step-challenge/done-step/done-step.component";
import { StepsTransactionComponent } from "app/my-challenge/detail-my-step-challenge/steps-transaction/steps-transaction.component";
import { CreateRoutineChallengeComponent } from "app/create-challenge/create-routine-challenge/create-routine-challenge.component";

import { MyhomeComponent } from "app/myhome/myhome.component"
import { DetailRoutineComponent } from "app/categoriesfeed/routine-challenge/detail-routine/detail-routine.component";
import { CheckdataRoutineComponent } from "app/categoriesfeed/routine-challenge/checkdata-routine/checkdata-routine.component";
import { DetailMyRoutineChallengeComponent } from "app/my-challenge/detail-my-routine-challenge/detail-my-routine-challenge.component";
import { DoneRoutineComponent } from "app/my-challenge/detail-my-routine-challenge/done-routine/done-routine.component";

const appRoutes: Routes = [
  { path: '', component: MyhomeComponent },
  { path: 'feeds', component: CategoriesfeedComponent },
  { path: 'savingmoney', component: SavingmoneyComponent },
  { path: 'detailSavingMoney', component: DetailSavingMoneyComponent },
  { path: 'detailSavingMoney/:id', component: DetailSavingMoneyComponent },
  { path: 'mychallenge', component: MyChallengeComponent },
  { path: 'checkdatamoney', component: CheckdataSavingmoneyComponent },
  { path: 'checkdatamoney/:id', component: CheckdataSavingmoneyComponent },
  { path: 'detailmySavingMoneychallenge', component: DetailMySavingmoneyChallengeComponent },
  { path: 'detailmySavingMoneychallenge/:id', component: DetailMySavingmoneyChallengeComponent },
  { path: 'addmoney', component: AddMoneyComponent },
  { path: 'addmoney/:id', component: AddMoneyComponent },
  { path: 'createSavingmoneyChallenge', component: CreateSavingmoneyChallengeComponent},
  { path: 'selectCategory', component: SelectCategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'selectCategory', component: SelectCategoryComponent },
  { path: 'checklistChallenge', component: ChecklistChallengeComponent},
  { path: 'detailChecklist', component: DetailChecklistComponent},
  { path: 'detailChecklist/:id', component: DetailChecklistComponent},
  { path: 'createChecklistChallenge', component: CreateChecklistChallengeComponent},
  { path: 'detailmyChecklistchallenge', component: DetailMyChecklistChallengeComponent},
  { path: 'detailmyChecklistchallenge/:id', component: DetailMyChecklistChallengeComponent},
  { path: 'stepchallenge', component: StepChallengeComponent},
  { path: 'routinechallenge', component: RoutineChallengeComponent},
  { path: 'createtaskchecklist', component: CreateTaskChecklistComponent},
  { path: 'createtaskchecklist/:id', component: CreateTaskChecklistComponent},
  { path: 'checkdataChecklist', component: CheckdataChecklistComponent},
  { path: 'checkdataChecklist/:id', component: CheckdataChecklistComponent},
  { path: 'myprofile', component: UserProfileComponent},
  { path: 'checkPost', component: DoneChecklistComponent},
  { path: 'checkPost/:id1/:id2', component: DoneChecklistComponent},
  { path: 'checkHistory/:id', component: ChecklistTaskTransactionComponent},
  { path: 'detailStep', component: DetailStepComponent},
  { path: 'detailStep/:id', component: DetailStepComponent},
  { path: 'createStepChallenge', component: CreateStepChallengeComponent},
  { path: 'createtaskstep', component: CreateTaskStepComponent},
  { path: 'createtaskstep/:id', component: CreateTaskStepComponent},
  { path: 'checkdataStep', component: CheckdataStepComponent},
  { path: 'checkdataStep/:id', component: CheckdataStepComponent},
  { path: 'detailmyStepchallenge', component: DetailMyStepChallengeComponent},
  { path: 'detailmyStepchallenge/:id', component: DetailMyStepChallengeComponent},
  { path: 'checkStep', component: DoneStepComponent},
  { path: 'checkStep/:id1/:id2', component: DoneStepComponent},
  { path: 'checkStepTran/:id', component: StepsTransactionComponent},
  { path: 'createRoutineChallenge', component: CreateRoutineChallengeComponent},
  { path: 'detailRoutine', component: DetailRoutineComponent},
  { path: 'detailRoutine/:id', component: DetailRoutineComponent},
  { path: 'checkdataRoutine', component: CheckdataRoutineComponent},
  { path: 'checkdataRoutine/:id', component: CheckdataRoutineComponent},
  { path: 'detailmyRoutinechallenge', component: DetailMyRoutineChallengeComponent},
  { path: 'detailmyRoutinechallenge/:id', component: DetailMyRoutineChallengeComponent},
  { path: 'checkRoutine', component: DoneRoutineComponent},
  { path: 'checkRoutine/:id/:id', component: DoneRoutineComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);