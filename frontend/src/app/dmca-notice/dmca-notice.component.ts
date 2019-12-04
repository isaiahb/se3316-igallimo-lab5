import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
	selector: 'app-dmca-notice',
	templateUrl: './dmca-notice.component.html',
	styleUrls: ['./dmca-notice.component.scss']
})
export class DmcaNoticeComponent implements OnInit {
	dmca: String;

	constructor(private http: HttpService) { }

	ngOnInit() {
	}

}
