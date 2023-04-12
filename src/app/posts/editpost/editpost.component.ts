//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";

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
	constructor(private postService: PostService, private readonly route: ActivatedRoute, private formBuilder: FormBuilder, private alertService: AlertService) { }

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

		const b = { title: this.registerForm.get('title').value, body: this.registerForm.get('body').value };

		this.postService.edit(this.registerForm.get('idpost').value, b)
			.subscribe({

				next: data => {

					// Not really needed :-)
					this.postId = data.id;

					// Note: An Interface <apiResult> needs to be defined in PostService matching the Post Model at the Web API - without first catital 
					// letters of the Post Model properties
					// Setting the GUI with the value returned from the Web API
					this.f.idpost.setValue(data.id);
					this.f.title.setValue(data.title);
					this.f.body.setValue(data.body);


					// Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
					this.alertService.success('The Post was edited successfully ! ', false);


				},
				error: error => {

					console.error('There were input errors ! ', error);

					this.alertService.error('You submited one or more input values with wrong format or no connection to the API: ' + error);

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

		this.postService.getPost(this.idParam).subscribe({

			next: data => {

				// Not really needed :-)
				this.postId = data.id;

				// Setting the form input initial values received from the Web API 
				this.f.idpost.setValue(data.id);
				this.f.title.setValue(data.title);
				this.f.body.setValue(data.body);

				// Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
				this.alertService.success('The Post is ready for editing...', false);

			},
			error: error => {

				// this.errorMessage = error.message;
				console.error('There may be one or more input values with wrong format ! ', error);

				this.alertService.error('There may be one or more values with wrong format or no connection to the API ! ' + error);
			}
		})

	}
}

