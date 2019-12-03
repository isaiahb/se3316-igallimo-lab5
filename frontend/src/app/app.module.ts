import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { SongsComponent } from './songs/songs.component';
import { SongComponent } from './song/song.component';
import { CookieService } from 'ngx-cookie-service';
import {TokenService} from "./token.service";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminComponent,
    SongsComponent,
    SongComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule

  ],
  providers: [
	  CookieService,
	  {
		  provide: HTTP_INTERCEPTORS,
		  useClass: TokenService,
		  multi: true
	  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
