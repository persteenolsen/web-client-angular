//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from '@/_services';

@Component({
	selector: 'selectedpost-page',
	templateUrl: './selectedpost.component.html'
})

export class SelectedPostComponent implements OnInit {

	idPost: any;
	titlePost: any;
	bodyPost: any;

	idParam: any;
	errorMessage: any;

	constructor(private postService: PostService, private readonly route: ActivatedRoute) { }

	ngOnInit() {

		// Getting the selected post ( for exampe: posts/3 ) from the url matching the route defined in the route-module: thepost:id 
		this.idParam = this.route.snapshot.paramMap.get("id");

		this.postService.getPost(this.idParam).subscribe({

			next: data => {
				this.idPost = data.id;
				this.titlePost = data.title;
				this.bodyPost = data.body;
			},
			error: error => {
				this.errorMessage = error.message;
				console.error('There was an error!', error);
			}
		})

	}
}

