import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './pages/categories/categories.component';
import { SavingMoneyComponent } from './pages/categories/saving-money/saving-money.component';
import { DetailSavingMoneyComponent } from './pages/categories/saving-money/detail-saving-money/detail-saving-money.component';

const appRoutes: Routes = [

  { path: '', component: CategoriesComponent },
  { path: 'savingmoney', component: SavingMoneyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);