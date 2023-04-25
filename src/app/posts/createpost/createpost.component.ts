//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";

import { first } from 'rxjs/operators';
import { Post } from '@/_models';

import { ActivatedRoute, Router } from "@angular/router";
import { PostService, AlertService } from '@/_services';
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

		this.postService.create(b.title, b.body).subscribe({

			next: data => {

				// Note: An Interface <apiResult> needs to be defined in PostService matching the Post Model at the Web API - without first catital 
				// letters of the Post Model properties
				// Setting the GUI with the value returned from the Web API
				this.f.idpost.setValue(data.id);
				this.f.title.setValue(data.title);
				this.f.body.setValue(data.body);

				// Success Alert which will close by use another route "false" / "true" will keep the alert box on screen
				this.alertService.success('The Post was created successfully ! ', false);


			},
			error: error => {

				console.error('There were input errors ! ', error);

				// The errors will most likely be a bad request 400 in one of there forms:
				// 1) Model Annotation - validation
				// 2) A message like email is alereay take
				// There could also be a message 404 in terms of no api connection					
				var errorMsg = JSON.stringify(error);

				// Looking for a 400 http bad request - Model Annotation - validation
				if (errorMsg.indexOf('[') > 0 && errorMsg.indexOf(']') > 0) {

					// Removing the {} and []
					if (errorMsg.length > 1) {

						// Removing the {}
						errorMsg = errorMsg.substring(1, (errorMsg.length - 1));

						// Removing all the []
						// Note: The error messages at the Moel must not contain "," 
						var errArray = errorMsg.split(',');
						for (let i = 0; i < errArray.length; i++) {
							errorMsg = errorMsg.replace('[', '');
							errorMsg = errorMsg.replace(']', '');
						}

					}
				}

				this.alertService.error(errorMsg);

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

