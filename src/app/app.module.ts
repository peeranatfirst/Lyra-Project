import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { CategoriesfeedComponent } from './categoriesfeed/categoriesfeed.component';
import { SavingmoneyComponent } from './categoriesfeed/savingmoney/savingmoney.component';
import { NavbarComponent } from './share/navbar/navbar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  {path:'', component: CategoriesfeedComponent},
  {path:'savingmoney', component: SavingmoneyComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CategoriesfeedComponent,
    SavingmoneyComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes) ,
    NgbModule.forRoot()
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
