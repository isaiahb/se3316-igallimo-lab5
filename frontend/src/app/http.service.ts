import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Song, User, TakeDownNotice, Review } from "../app/models";

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	url:String = "http://localhost:9001/api/";

	constructor(private _http: HttpClient) {}

	//User
	signup(payload): Observable<User> {
		return <Observable<User>> this._http.post(this.url+"signup", payload);
	}

	login(payload): Observable<Object>{
		return <Observable<Object>>this._http.post(this.url+"login", payload);
	}

	//Songs
	getSongs(): Observable<Song[]>{
		return <Observable<Song[]>>this._http.get(this.url+"songs");
	}

}
