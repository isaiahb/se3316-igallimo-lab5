import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Song, User, TakeDownNotice, Review } from "../app/models";
import { CookieService } from 'ngx-cookie-service';


@Injectable({
	providedIn: 'root'
})
export class HttpService {
	url:String = "http://localhost:9001/api/";

	constructor(private _http: HttpClient, private cookieService: CookieService) {}

	//User
	signup(payload) {
		return this._http.post(this.url+"signup", payload);
	}

	login(payload) {
		return this._http.post(this.url+"login", payload);
	}

	logout() {
		this.cookieService.set('auth', "");
	}

	isLoggedIn() {
		let token  = this.cookieService.get('auth');
		console.log(console.log("test"));
		console.log(token);
		if(token == null || !token || token == "undefined") {
			console.log("not logged in");
			return false;
		}
		else {
			console.log("logged in");
			return true;
		}
	}

	getSongs() {
		return this._http.get(this.url+"songs");
	}
	getPopularSongs() {
		return this._http.get(this.url+"songs/popular");
	}
	createSong(payload) {
		return this._http.post(this.url+"songs", payload);
	}
	searchSongs(search) {
		return this._http.get(this.url+"/songs/search/"+ search);
	}

	createReview(payload, songId) {
		return this._http.post(this.url+"/songs/reviews/"+songId, payload);
	}

	getMostRecentReview(payload, songId) {
		return this._http.get(this.url+"/songs/reviews/recent/"+songId);
	}
	
	getSongReviews(songId) {
		return this._http.get(this.url+"/songs/reviews/"+songId);
	}
	

}
