import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../http.service";
import {Song } from "../models";

@Component({
	selector: 'app-song',
	templateUrl: './song.component.html',
	styleUrls: ['./song.component.scss']
})

export class SongComponent implements OnInit {
	@Input() song: Song;
	showAll: Boolean = false;

	constructor(private http: HttpService) { }
	ngOnInit() {

	}

	toggle() {
		this.showAll = !this.showAll;
	}

}
