import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { CategoriesComponent } from './pages/categories/categories.component';


import { SavingMoneyComponent } from './pages/categories/saving-money/saving-money.component';
import { RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './share/navbar/navbar.component';

const appRoutes: Routes = [
    {path:'', component:CategoriesComponent},
    {path:'savingmoney', component:SavingMoneyComponent}
]

import { DetailSavingMoneyComponent } from './pages/categories/saving-money/detail-saving-money/detail-saving-money.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    SavingMoneyComponent,
    NavbarComponent,
    DetailSavingMoneyComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
