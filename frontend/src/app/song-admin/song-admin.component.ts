import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../http.service";
import { Router } from '@angular/router'
import { Song } from '../models';

@Component({
	selector: 'app-song-admin',
	templateUrl: './song-admin.component.html',
	styleUrls: ['./song-admin.component.scss']
})
export class SongAdminComponent implements OnInit {
	@Input() song: Song;

	constructor() { }

	ngOnInit() {

	}

}
