import { Component, OnInit, Input } from '@angular/core';
import { Song, Review } from "../models";
import { HttpService } from "../http.service";

@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.scss']
})
export class ReviewComponent{
	// @Input() song: Song;
	// rating: String;
	// review: Number;

	// constructor(private http: HttpService) { }

	// ngOnInit() {}

	// submitId() {
	// 	this.http.createReview({review: this.review, rating: this.review});
	// }

}
