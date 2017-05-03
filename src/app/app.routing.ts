import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { CategoriesfeedComponent } from './categoriesfeed/categoriesfeed.component';
import { SavingmoneyComponent } from './categoriesfeed/savingmoney/savingmoney.component';
import { DetailSavingMoneyComponent } from './categoriesfeed/savingmoney/detail-saving-money/detail-saving-money.component';
import { MyChallengeComponent } from './my-challenge/my-challenge.component';
import { CheckdataSavingmoneyComponent } from './categoriesfeed/savingmoney/checkdata-savingmoney/checkdata-savingmoney.component'
import { DetailMyChallengeComponent } from './my-challenge/detail-my-challenge/detail-my-challenge.component';
import { AddMoneyComponent } from './categoriesfeed/savingmoney/add-money/add-money.component';
import { CreateSavingmoneyChallengeComponent } from './create-challenge/create-savingmoney-challenge/create-savingmoney-challenge.component';
import { SelectCategoryComponent } from './create-challenge/select-category/select-category.component';

const appRoutes: Routes = [
  { path: '', component: CategoriesfeedComponent },
  { path: 'savingmoney', component: SavingmoneyComponent },
  { path: 'detailsavingmoney', component: DetailSavingMoneyComponent },
  { path: 'detailsavingmoney/:id', component: DetailSavingMoneyComponent },
  { path: 'mychallenge', component: MyChallengeComponent },
  { path: 'checkdatamoney', component: CheckdataSavingmoneyComponent },
  { path: 'checkdatamoney/:id', component: CheckdataSavingmoneyComponent },
  { path: 'detailmychallenge', component: DetailMyChallengeComponent},
  { path: 'detailmychallenge/:id', component: DetailMyChallengeComponent},
  { path: 'addmoney', component: AddMoneyComponent },
  { path: 'addmoney/:id', component: AddMoneyComponent },
  { path: 'createSavingmoneyChallenge', component: CreateSavingmoneyChallengeComponent},
  { path: 'selectCategory', component: SelectCategoryComponent }

]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);