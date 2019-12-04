import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import {Song, User } from "../models";
import {SongComponent} from "../song/song.component";

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	search: String;
	songs: Song[] = [];

	constructor(private http: HttpService) { }
	ngOnInit(){}

	getSongs() {
		this.http.searchSongs(this.search).subscribe((response)=> {
			this.songs = response["songs"];
		});
		console.log("trying to search songs");
	}

	declarations: [
		SongComponent
	]

}
