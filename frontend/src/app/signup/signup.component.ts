import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";


@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	email: String;
	password: String;

	constructor(private http: HttpService) { }

	ngOnInit() {

	}

	signup() {
		this.http.signup({email: this.email, password: this.password}).subscribe((user)=>{
			console.log(user);
		});

	}

}
