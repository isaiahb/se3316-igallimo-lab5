import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../http.service";
import {Song, Review} from "../models";

@Component({
	selector: 'app-song',
	templateUrl: './song.component.html',
	styleUrls: ['./song.component.scss']
})

export class SongComponent implements OnInit {
	@Input() song: Song;
	reviews: Review[] = [];

	showAll: Boolean = false;
	showReviews: Boolean = false;
	
	constructor(private http: HttpService) { }
	ngOnInit() {}
	getReviews() {
		this.http.getSongReviews(this.song._id).subscribe((response)=>{
			this.reviews = response["reviews"];
		});
	}

	toggle() {
		this.showAll = !this.showAll;
	}
	toggleReviews() {
		this.showReviews = !this.showReviews;
		if (this.showReviews) {
			this.getReviews();
		}
	}

}
