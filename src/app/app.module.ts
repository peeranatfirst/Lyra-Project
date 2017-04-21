import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { CategoriesComponent } from './pages/categories/categories.component';

import { HeaderComponent } from './shared/header/header.component';
import { MenubarComponent } from './pages/categories/shared/menubar.component';
import { routing } from './app.routing';
import { SavingMoneyComponent } from './pages/categories/saving-money/saving-money.component';
import { DetailSavingMoneyComponent } from './pages/categories/saving-money/detail-saving-money/detail-saving-money.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    HeaderComponent,
    MenubarComponent,
    SavingMoneyComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    BrowserModule,
    routing

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
