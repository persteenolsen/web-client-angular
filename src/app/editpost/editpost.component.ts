//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
//import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from "@angular/router";

import { PostService, AlertService } from '@/_services';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

@Component({
    selector: 'editpost-page',
    templateUrl: './editpost.component.html'
})

export class EditPostComponent implements OnInit {
    
	registerForm: FormGroup;
    submitted: any;
	//loading = false;
	 
   	postId: any;
	idParam: any;
	errorMessage: any;	
	
    // Constructor	
    constructor( private postService: PostService, private readonly route: ActivatedRoute, private formBuilder: FormBuilder, private alertService: AlertService ) { }
    
	// Convenience getter for easy access to form fields in the template and here
    get f() { return this.registerForm.controls; }

    onSubmit() {
            
			this.submitted = true;
			
			// reset alerts on submit
            this.alertService.clear();

            // stop here if form is invalid
            if (this.registerForm.invalid) {
               return;
            }

		  // this.loading = true;
			
           // alert( 'Form values you entered:\n\n' + JSON.stringify( this.registerForm.value ));
		  /* alert( 'Form values you submitted:\n\nId:\n' + 
		           this.registerForm.get('idpost').value + '\n\nTitle:\n' + 
		           this.registerForm.get('title').value + '\n\nBody:\n' + 
		           this.registerForm.get('body').value  
		        ); */
		 			
		    const b = { title: this.registerForm.get('title').value, body: this.registerForm.get('body').value };
           		   
		   //this.http.put<EditResult>('http://localhost:4000/posts/' + this.registerForm.get('idpost').value, body )
		   // this.http.put<EditResult>('https://users.api.core.persteenolsen.com/posts/' + this.registerForm.get('idpost').value, body )
		   
		   // Taking the apiUrl from webpack
		   // this.http.put<EditResult>( `${config.apiUrl}` + '/posts/' + this.registerForm.get('idpost').value, body )
		   this.postService.edit(this.registerForm.get('idpost').value, b)
		   .subscribe({
           
		   next: data => {
		        
				// Not really needed :-)
                this.postId = data.id;
				
				//alert( 'Form values returned from the Web API:\n\nId:\n' + data.id + '\n\nTitle:\n' + data.title + '\n\nBody:\n' + data.body );
				                
				// Note: <SearchResults> needs to be defined and returned in PostService
				// Setting the GUI with the value returned from the Web API
		        this.f.idpost.setValue( data.id );
		        this.f.title.setValue( 'Title from Web API: ' + data.title );
                this.f.body.setValue( 'Body from Web API: ' + data.body ); 
				
				// Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
				this.alertService.success('The Post was edited successfully ! ', false);
				
				
            },
            error: error => {
               
                console.error('There were input errors ! ', error);
				
				this.alertService.error( 'You submited one or more input values with wrong format or no connection to the API: ' + error );
								
				// this.loading = false;
            }
          });		
		
     }
	 
	   
    ngOnInit() {  
	
	      // Building the Form
	      this.registerForm = this.formBuilder.group({
		   
		   idpost: ['', Validators.required],
           title: ['', Validators.required],
           body: ['', Validators.required]
			
        }); 
		
		// reset alerts on loa
         this.alertService.clear();

		 	    
		 // Getting the selected post ( for exampe: posts/3 ) from the url matching the route defined in the route-module: editpost:id 
         this.idParam = this.route.snapshot.paramMap.get("id");
		 			    
		// Get Request for a selected post by id from the jsonplaceholder
		// Note: With Error handling: If there is an error like wrong url - an error message will be displayed
	    // this.http.get<SearchResult>('http://localhost:4000/posts/' + this.idParam ).subscribe({
		// this.http.get<SearchResult>('https://users.api.core.persteenolsen.com/posts/' + this.idParam ).subscribe({
		
		//this.http.get<SearchResult>( `${config.apiUrl}` + '/posts/' + this.idParam ).subscribe({
		this.postService.getPost( this.idParam ).subscribe({
		
		    next: data => {
			
                // Not really needed :-)
				this.postId = data.id;
								
				// Setting the form input initial values received from the Web API 
				this.f.idpost.setValue( data.id );
				this.f.title.setValue( data.title );
                this.f.body.setValue( data.body );
				
				// Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
			    this.alertService.success('The Post is ready for editing...', false);
			
            },
            error: error => {
                
				// this.errorMessage = error.message;
                console.error( 'There may be one or more input values with wrong format ! ', error);
				
				this.alertService.error( 'There may be one or more values with wrong format or no connection to the API ! ' + error );
            }
       })
	 
    }
}


// The interface matching the result from jsonplaceholder Web API
interface SearchResult {
   
	id: any;
    title: any;
	body: any;
	}


// The interface matching the result from jsonplaceholder Web API
interface EditResult {
    
   	id: any;
    title: any;
	body: any;
}