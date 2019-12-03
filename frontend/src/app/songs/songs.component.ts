import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import {Song, User } from "../models";
import {SongComponent} from "../song/song.component";
import { NgModel } from '@angular/forms';

@Component({
	selector: 'app-songs',
	templateUrl: './songs.component.html',
	styleUrls: ['./songs.component.scss']
})



export class SongsComponent implements OnInit {
	songs: Song[] = [];

	constructor(private http: HttpService) { }
	ngOnInit() {
		this.http.getSongs().subscribe((songs: Song[])=> {
			this.songs = songs;
			console.log(songs);
		});
		console.log("trying to load songs");
		// console.log(songs);
	}

	declarations: [
		SongComponent 
	]
}
