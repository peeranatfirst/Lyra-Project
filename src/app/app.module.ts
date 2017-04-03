import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { CategoriesComponent } from './pages/categories/categories.component';

import { HeaderComponent } from './shared/header/header.component';
import { MenubarComponent } from './shared/menubar/menubar.component';
import {  } from '';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    HeaderComponent,
    MenubarComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    BrowserModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
