//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
//import { HttpClient } from '@angular/common/http';

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
			
    constructor( private postService: PostService,  private readonly route: ActivatedRoute ) { }

    ngOnInit() {  
	    
		 // Getting the selected post ( for exampe: posts/3 ) from the url matching the route defined in the route-module: thepost:id 
         this.idParam = this.route.snapshot.paramMap.get("id");
			    
		// Get Request for a selected post by id from the jsonplaceholder
		// Note: With Error handling: If there is an error like wrong url - an error message will be displayed
	    //  this.http.get<SearchResults>('http://localhost:4000/posts/' + this.idParam ).subscribe({
		//  this.http.get<SearchResults>('https://users.api.core.persteenolsen.com/posts/' + this.idParam ).subscribe({
		
		// Taking the apiUrl from webpack
		//this.http.get<SearchResults>( `${config.apiUrl}` + '/posts/' + this.idParam ).subscribe({
			this.postService.getPost( this.idParam ).subscribe({
		      
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

