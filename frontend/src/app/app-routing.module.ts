import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {SongsComponent} from "./songs/songs.component";


const routes: Routes = [
	{path: "", component: LandingComponent},
	{path: "login", component: LoginComponent},
	{path: "signup", component: SignupComponent},
	{
		path: "home", 
		component: HomeComponent,
		// children: [
		// 	{path: 'songs', component:SongsComponent}, 
		// ]
	},
	{path: "songs", component: SongsComponent,},
	{path: "admin", component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
