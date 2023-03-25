//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from "@angular/router";


import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'createpost-page',
    templateUrl: './createpost.component.html'
})

export class CreatePostComponent implements OnInit {
    
	registerForm: FormGroup;
    submitted: any;
	
	errorMessage: any;	
	
    // Constructor	
    constructor( private http: HttpClient, private readonly route: ActivatedRoute, private formBuilder: FormBuilder ) { }
    
	// Convenience getter for easy access to form fields in the template and here
    get f() { return this.registerForm.controls; }

    onSubmit() {
            
			this.submitted = true;

            // stop here if form is invalid
            if (this.registerForm.invalid) {
            return;
            }

           // alert( 'Form values you entered:\n\n' + JSON.stringify( this.registerForm.value ));
		   alert( 'Form values you submitted:\n\nTitle:\n' + 
		           this.registerForm.get('title').value + '\n\nBody:\n' + 
		           this.registerForm.get('body').value  
		        );
		 			
		    const body = { title: this.registerForm.get('title').value, body: this.registerForm.get('body').value };
           //  this.http.post<CreateResult>('https://jsonplaceholder.typicode.com/posts/', body )
		    this.http.post<CreateResult>('https://users.api.core.persteenolsen.com/posts/', body )
		   // this.http.post<CreateResult>('http://localhost:4000/posts/', body )
           .subscribe({
           
		    next: data => {
		        								
				alert( 'A Post with the Form values was created by the Web API:\n\nId:\n' + data.id + '\n\nTitle:\n' + data.title + '\n\nBody:\n' + data.body );
				
				 // Setting the GUI with the value returned from the Web API
		        this.f.idpost.setValue( data.id );
		        this.f.title.setValue( 'Title created successfully: ' + data.title );
                this.f.body.setValue( 'Body created successfully: ' + data.body ); 
				
				
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
          });		
		
     }
	 
	   
    ngOnInit() {  
	
	      // Building the Form
	      this.registerForm = this.formBuilder.group({
		   
		   idpost: [''],
           title: ['', Validators.required],
           body: ['', Validators.required]
			
        }); 
		
		  
		 
    }
}


// The interface matching the result from jsonplaceholder Web API
interface CreateResult {
    
   	id: any;
    title: any;
	body: any;
}