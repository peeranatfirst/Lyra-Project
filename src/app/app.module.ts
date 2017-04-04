import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { CategoriesComponent } from './pages/categories/categories.component';

import { HeaderComponent } from './shared/header/header.component';
import { MenubarComponent } from './pages/categories/shared/menubar.component';
import { routing } from './app.routing';
import { SavingMoneyComponent } from './pages/categories/saving-money/saving-money.component';


<<<<<<< HEAD



=======
>>>>>>> 669ae336b101249b57d0ec1193365bbe4c2aef46
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    HeaderComponent,
    MenubarComponent,
    SavingMoneyComponent,
    
<<<<<<< HEAD

=======
>>>>>>> 669ae336b101249b57d0ec1193365bbe4c2aef46

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    BrowserModule,
<<<<<<< HEAD

   
=======
    routing
>>>>>>> 669ae336b101249b57d0ec1193365bbe4c2aef46
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
