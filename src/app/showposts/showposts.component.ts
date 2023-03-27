//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";

import { first } from 'rxjs/operators';

import { Post } from '@/_models';
import { PostService } from '@/_services';


@Component({
    selector: 'showposts-page',
    templateUrl: './showposts.component.html'
})

export class ShowPostsComponent implements OnInit {
   
	listOfPosts: any;
	errorMessage: any;
	
    // The Constructor	
    constructor( private postService: PostService) { }
    
    ngOnInit(): void {

       	  		
	    // Method call for displaying the updatd List of Posts after one was deleted
		this.displayPosts();
		
		//alert( 'ApiUrl from Webpack: ' + `${config.apiUrl}` + '/posts');
		
	   
    }
      
	  
	displayPosts (){
       
        		
		// Taking the apiUrl from webpack
		this.postService.getAll().subscribe({ 
	    
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
