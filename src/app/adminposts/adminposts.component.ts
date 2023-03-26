//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { AlertService } from '@/_services';

@Component({
    selector: 'adminposts-page',
    templateUrl: './adminposts.component.html'
})

export class AdminPostsComponent implements OnInit {

   
	listOfPosts: any;
	errorMessage: any;
	
    // The Constructor	
    constructor(private http: HttpClient, private alertService: AlertService) { }
    
    ngOnInit(): void {

       	  		
	    // Method call for displaying the updatd List of Posts after one was deleted
		this.displayPosts();
		
	   
    }
       
	displayPosts (){
       
        
		// Testing against a .net core 2.2 backend - localhost
		// this.http.get<PostSearchResult>('http://localhost:4000/posts').subscribe({ 
		
		// Test agains a .net core 2.2 backend on a traditional webserver
		// this.http.get<PostSearchResult>('https://users.api.core.persteenolsen.com/posts').subscribe({ 
		
		// Taking the apiUrl from webpack
		this.http.get<PostSearchResult>(`${config.apiUrl}` + '/posts' ).subscribe({ 
			
		    next: data => {
                this.listOfPosts = data;
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
       })

    }


    
	
	// A function to delete the selected Post fired by click at the listpost.component.html - Template
	deletePost(id: number) {
	  
	     if( confirm( "Are you sure to delete the Post width Id: " + id ) ) {
		 
		 // reset alerts on delete
          this.alertService.clear();
	  	      
		  // this.http.delete('https://users.api.core.persteenolsen.com/posts/' + id )
		  // this.http.delete('http://localhost:4000/posts/' + id )
		  
		  // Taking the apiUrl from webpack
		   this.http.delete( `${config.apiUrl}` + '/posts/' + id )
		  
           .subscribe({
		   
               next: data => {
			
                   //alert('The Post was deleted successfully!');
				   
				   // Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
				   this.alertService.success('The Post was deleted successfully ! ', false);
                   
				   // Method call for displaying the updatd List of Posts after one was deleted
			       this.displayPosts();

			       // Removing the selected row from the table
			      // this.listOfPosts.splice( (id-1), 1 );
							
                 },
            error: error => {
              
			    console.error( 'There was an error trying to delete the Post ! ', error);
				this.alertService.error( 'There was an error trying to delete the Post or no connection to the API: ' + error );
            }
        });
	  
	  }
       
    }
}


// The interface matching the result from jsonplaceholder Web API
interface PostSearchResult {
   
	id: any;
    title: any;
	body: any;
 
}