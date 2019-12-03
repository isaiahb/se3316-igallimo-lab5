import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
	email: String;
	password: String;

	constructor(private http: HttpService, private cookieService: CookieService) { }

	ngOnInit() {}
	login() {
		this.http.login({email: this.email, password:this.password}).subscribe((object)=>{
			let token = object["auth"];
			console.log(token);
			console.log(object);
			this.cookieService.set('auth', token);
    		// this.cookieValue = this.cookieService.get('Test');
			
		});
	}
}
