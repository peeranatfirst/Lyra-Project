import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { CategoriesfeedComponent } from './categoriesfeed/categoriesfeed.component';
import { SavingmoneyComponent } from './categoriesfeed/savingmoney/savingmoney.component';
import { DetailSavingMoneyComponent } from './categoriesfeed/savingmoney/detail-saving-money/detail-saving-money.component';
import { MyChallengeComponent } from './my-challenge/my-challenge.component';
import { CheckdataSavingmoneyComponent } from './categoriesfeed/savingmoney/checkdata-savingmoney/checkdata-savingmoney.component'

const appRoutes: Routes = [
  { path: '', component: CategoriesfeedComponent },
  { path: 'savingmoney', component: SavingmoneyComponent },
  { path: 'detailsavingmoney', component: DetailSavingMoneyComponent },
  { path: 'detailsavingmoney/:id', component: DetailSavingMoneyComponent },
  { path: 'mychallenge', component: MyChallengeComponent },
  { path: 'checkdatamoney', component: CheckdataSavingmoneyComponent },
  { path: 'checkdatamoney/:id', component: CheckdataSavingmoneyComponent }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);