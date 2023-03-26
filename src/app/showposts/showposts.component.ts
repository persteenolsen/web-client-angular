//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'showposts-page',
    templateUrl: './showposts.component.html'
})

export class ShowPostsComponent implements OnInit {

   
	listOfPosts: any;
	errorMessage: any;
	
    // The Constructor	
    constructor(private http: HttpClient) { }
    
    ngOnInit(): void {

       	  		
	    // Method call for displaying the updatd List of Posts after one was deleted
		this.displayPosts();
		
		//alert( 'ApiUrl from Webpack: ' + `${config.apiUrl}` + '/posts');
		
	   
    }
      
	  
	displayPosts (){
       
        
		// Testing against a .net core 2.2 backend - localhost
		// this.http.get<PostSearchResult>('http://localhost:4000/posts').subscribe({ 
		
		// Test agains a .net core 2.2 backend on a traditional webserver
		//this.http.get<PostSearchResult>('https://users.api.core.persteenolsen.com/posts').subscribe({ 
		
		// Taking the apiUrl from webpack
		this.http.get<PostSearchResult>(`${config.apiUrl}` + '/posts').subscribe({ 
	    
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


// The interface matching the result from jsonplaceholder Web API
interface PostSearchResult {
   
	id: any;
    title: any;
	body: any;
 
}