import { Component, OnInit } from '@angular/core';
import { HttpService } from "./http.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'frontend';
  isLoggedIn: Boolean = false;
  constructor(private http: HttpService, private router: Router) { 
	  this.isLoggedIn = http.isLoggedIn();
  }
  ngOnInit() {
	this.isLoggedIn = this.http.isLoggedIn();
  }

  logout() {
	  this.http.logout();
	  this.isLoggedIn = this.http.isLoggedIn();
	  this.router.navigateByUrl("/");
  }

}
