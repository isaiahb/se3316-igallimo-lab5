import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Song, User } from "../models";
import { SongComponent } from "../song/song.component";

@Component({
	selector: 'app-popular',
	templateUrl: './popular.component.html',
	styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

	search: String;
	songs: Song[] = [];

	constructor(private http: HttpService) { }
	ngOnInit() {
		this.http.getPopularSongs().subscribe((response) => {
			this.songs = response["songs"];
		});
		console.log("trying to search songs");
	}

	declarations: [
		SongComponent
	]

}