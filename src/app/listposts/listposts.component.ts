//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'listposts-page',
    templateUrl: './listposts.component.html'
})

export class ListpostsComponent implements OnInit {

    totalAngularPackages: any;
	listOfPosts: any;
	errorMessage: any;
	
    // The Constructor	
    constructor(private http: HttpClient) { }
	
	
    ngOnInit() {  
	    
			    
		// Get Request for the total number of Angular packages at api.nmps.io
        this.http.get<NPMSearchResult>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
        this.totalAngularPackages = data.total;
        })
	  		
	    
		// Get Request for a list of posts at jsonplaceholder
		// Note: With Error handling: If there is an error like wrong url - an error message will be displayed
	    // this.http.get<PostSearchResult>('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10').subscribe({
		
		// Testing against a .net core 2.2 backend - localhost
		// this.http.get<PostSearchResult>('http://localhost:4000/posts').subscribe({ 
		
		// Test agains a .net core 2.2 backend on a traditional webserver
		this.http.get<PostSearchResult>('https://users.api.core.persteenolsen.com/posts').subscribe({ 
	
		    next: data => {
                this.listOfPosts = data;
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
       })
	   
    }
}


// The interface matching the result from api.nmps.io Web API
interface NPMSearchResult {
    total: number;
    results: Array<object>;
}

// The interface matching the result from jsonplaceholder Web API
interface PostSearchResult {
   
	id: any;
    title: any;
	body: any;
 
}