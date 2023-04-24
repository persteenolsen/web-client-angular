import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            
			if (err.status === 401) {
                // Auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            			
            // For testing !			
			//alert( 'Error: ' + JSON.stringify( err ));
			//alert( 'Status 1: ' + err.status + ' Status 2: ' + err.statusText + ' Message 1: ' + err.message +  ' Message 2: ' + err.error.message );
			
			// Look for error msg defined at the Model Anotation in Web API => else look for error messages => else look for http status code 
			// Note: A wrong Web API connection - 404 can only be catch by "err.message"
			var error = '';
			if (err.status === 404)
				error = err.message;
			else
			    error = err.error.errors || err.error.message || err.status; 
					   			
            return throwError(error);
        }))
    }
}