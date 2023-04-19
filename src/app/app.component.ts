import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
		
		// TEST - Is called on initial loa an browser refresh
		/*if( this.currentUser )
		    alert('Current User First Name: ' + JSON.stringify(this.currentUser['firstName']));
        else
		    alert('No Current User is logged in !');
		*/
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}