//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
//import { HttpClient } from '@angular/common/http';

import { first } from 'rxjs/operators';

import { Post } from '@/_models';
import { PostService } from '@/_services';


import { AlertService } from '@/_services';

@Component({
    selector: 'adminposts-page',
    templateUrl: './adminposts.component.html'
})

export class AdminPostsComponent implements OnInit {

   
	listOfPosts: any;
	errorMessage: any;
	
    // The Constructor	
    constructor( private postService: PostService, private alertService: AlertService) { }
    
    ngOnInit(): void {

       	  		
	    // Method call for displaying the updatd List of Posts after one was deleted
		this.displayPosts();
		
	   
    }
       
	displayPosts (){
       
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


    
	
	// A function to delete the selected Post fired by click at the listpost.component.html - Template
	deletePost(id: number) {
	  
	     if( confirm( "Are you sure to delete the Post width Id: " + id ) ) {
		 
		 // reset alerts on delete
         this.alertService.clear();
	  	
		  
		  // Taking the apiUrl from webpack
		  this.postService.delete( id ).subscribe({
		   
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
