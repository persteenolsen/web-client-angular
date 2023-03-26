//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from "@angular/router";

import { AlertService } from '@/_services';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'createpost-page',
    templateUrl: './createpost.component.html'
})

export class CreatePostComponent implements OnInit {
    
	registerForm: FormGroup;
    submitted: any;
	//loading = false;
	
	errorMessage: any;	
		
    // Constructor	
    constructor( private http: HttpClient, private readonly route: ActivatedRoute, private formBuilder: FormBuilder, private alertService: AlertService ) { }
    
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
		   /* alert( 'Form values you submitted:\n\nTitle:\n' + 
		           this.registerForm.get('title').value + '\n\nBody:\n' + 
		           this.registerForm.get('body').value  
		        ); 
			*/
		 			
		    const body = { title: this.registerForm.get('title').value, body: this.registerForm.get('body').value };
           // this.http.post<CreateResult>('https://users.api.core.persteenolsen.com/posts/', body )
		   // this.http.post<CreateResult>('http://localhost:4000/posts/', body )
		   
		   // Taking the apiUrl from webpack
		   this.http.post<CreateResult>( `${config.apiUrl}` + '/posts/', body )
		   
			
           .subscribe({
           
		    next: data => {
		        								
				//alert( 'A Post with the Form values was created by the Web API:\n\nId:\n' + data.id + '\n\nTitle:\n' + data.title + '\n\nBody:\n' + data.body );
				
				 // Setting the GUI with the value returned from the Web API
		        this.f.idpost.setValue( data.id );
		        this.f.title.setValue( 'Title created successfully: ' + data.title );
                this.f.body.setValue( 'Body created successfully: ' + data.body ); 
				
				
				// Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
				this.alertService.success('The Post was created successfully ! ', false);
				
				
            },
            error: error => {
			
			    console.error('There were input errors ! ', error);
				
				this.alertService.error( 'You submited one or more input values with wrong format or no connection to the API: ' + error );
								
				// this.loading = false;
				
            }
          });		
		
     }
	 
	   
    ngOnInit() {  
	     
		 
		// reset alerts on loa
         this.alertService.clear();
		  
	      
		 // Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
		 this.alertService.success('Ready for creating a new Post...', false);
				
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