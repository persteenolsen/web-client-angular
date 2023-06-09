//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";

import { User } from '@/_models';
import { UserService, AlertService } from '@/_services';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

@Component({
	selector: 'editprofile-page',
	templateUrl: './editprofile.component.html'
})

export class EditProfileComponent implements OnInit {

	registerForm: FormGroup;
	submitted: any;
	//loading = false;

	userId: any;
	idParam: any;
	errorMessage: any;

	// Constructor	
	constructor(private userService: UserService, private readonly route: ActivatedRoute, private formBuilder: FormBuilder, private alertService: AlertService) {

	}

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

		const b = {
			email: this.registerForm.get('email').value, password: this.registerForm.get('password').value,
			title: this.registerForm.get('title').value, firstname: this.registerForm.get('firstname').value,
			lastname: this.registerForm.get('lastname').value, role: this.registerForm.get('role').value
		};
        
		// The async operation starts here
		// Note: Rxjs take care of the asyncronic operation (http call to web api) like promises, async/await or axios but have more functions / operators
		this.userService.editprofile(this.registerForm.get('iduser').value, b)
			
			// The pipe / first is not really needed here but fine for demo
			.pipe(first())
			
			.subscribe(

				  data => {

					// Not really needed :-)
					//this.userId = data.id;

					// Note: Only status 200 is returned
					// Setting the GUI with the value returned from the Web API
					// Id is not returned from the Web API which is fine :-)
					//	this.f.iduser.setValue(data.id);
					//	this.f.email.setValue('Email from Web API: ' + data.email);
					//  this.f.password.setValue('Password from Web API: ' + data.Password);
					//	this.f.title.setValue('Title from Web API: ' + data.title);
					//	this.f.firstname.setValue('Firstname from Web API: ' + data.firstName);
					//	this.f.lastname.setValue('Lastname Web API: ' + data.lastName);
					//	this.f.lastname.setValue('Role from Web API: ' + data.role);

					var apiResponse = "Title: " + data.title + " Firstname: " + data.firstName + " LastName: " + data.lastName +
						" Email: " + data.email + " Role: " + data.role;

					// Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
					this.alertService.success('The User was updated successfully with these values: ' + apiResponse, false);

					// Note: Updating msg at the right corner - The name and role of the User logged in
					document.getElementById("UserLoggedIn").innerText = data.firstName + " - " + data.role;


				},
				error => {

					console.error('There were input errors ! ', error);

					this.alertService.error('You submited one or more input values with wrong format or no connection to the API: ' + error);

					// this.loading = false;
				}
			);

	}


	ngOnInit() {

		// Building the Form
		this.registerForm = this.formBuilder.group({

			iduser: ['', Validators.required],
			title: ['', Validators.required],
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
			role: ['', Validators.required]

		});

		// reset alerts on loa
		this.alertService.clear();

		// Getting the selected User ( for exampe: users/3 ) from the url matching the route defined in the route-module: edituser:id 
		this.idParam = this.route.snapshot.paramMap.get("id");
        
		// The async operation starts here
		// Note: Rxjs take care of the asyncronic operation (http call to web api) like promises, async/await or axios but have more functions / operators
		this.userService.getUser(this.idParam)
		
		 // The pipe / first is not really needed here but fine for demo
		.pipe(first())
		.subscribe(
		
			 data => {

				// Not really needed :-)
				//this.userId = data.id;

				// Setting the form input initial values received from the Web API
				// Note: The data.id, data.firstName and data.lastName matches the properties in the Web API User Model / DB				
				this.f.iduser.setValue(data.id);
				this.f.title.setValue(data.title);
				this.f.email.setValue(data.email);
				this.f.password.setValue(data.Password);
				this.f.firstname.setValue(data.firstName);
				this.f.lastname.setValue(data.lastName);
				this.f.role.setValue(data.role);

				// Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
				this.alertService.success('The User is ready for editing...', false);

			},
			error => {

				// this.errorMessage = error.message;
				console.error('There may be one or more input values with wrong format ! ', error);

				this.alertService.error('There may be one or more values with wrong format or no connection to the API ! ' + error);
			}
		)

	}
}

