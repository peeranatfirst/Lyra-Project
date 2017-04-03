import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
<<<<<<< HEAD
import { CategoriesComponent } from './pages/categories/categories.component';
=======
import { HeaderComponent } from './shared/header/header.component';
import { MenubarComponent } from './shared/menubar/menubar.component';
>>>>>>> c9c47d7be1454e09e72eadb0340558750a2faa08

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    CategoriesComponent
=======
    HeaderComponent,
    MenubarComponent
>>>>>>> c9c47d7be1454e09e72eadb0340558750a2faa08
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
