import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProductCardComponent,
    ProductDetailComponent,
    CartComponent,
    UserLoginComponent,
    UserRegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    SweetAlert2Module,
    NgbModule
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
