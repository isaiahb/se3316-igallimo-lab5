import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Router } from '@angular/router'
import { Song } from '../models';

@Component({
	selector: 'app-new-song',
	templateUrl: './new-song.component.html',
	styleUrls: ['./new-song.component.scss']
})

export class NewSongComponent implements OnInit {

	header: String;
	title: String;
	artist: String;
	album: String;
	year: String;
	comment: String;
	"zero-byte": Boolean;
	track: Number;
	genre: "String";

	rating: String;
	review: Number;
	
	constructor(private http: HttpService, private router: Router) { }

	ngOnInit() { }
	create() {
		console.log(this.artist);
		let song = {
			header: this.header,
			title: this.title, 
			artist: this.artist,
			album: this.album,
			year: this.year,
			comment: this.comment,
			"zero-byte": this["zero-byte"],
			genre: this.genre
		}
		this.http.createSong({song: song}).subscribe((response)=>{
			console.log(response);
		})
		console.log("creaeteing sonsg");
	}

}
