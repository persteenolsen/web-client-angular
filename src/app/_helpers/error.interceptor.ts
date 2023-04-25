import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private authenticationService: AuthenticationService) { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(catchError(err => {

			// NOT AUTORIZED
			// Auto logout if 401 response returned from api
			if (err.status === 401) {
				this.authenticationService.logout();

				//location.reload(true);
				location.reload();
			}

			// Testing the errors from the Web API !			
			//alert( 'Error: ' + JSON.stringify( err ));
			//alert( 'Status 1: ' + err.status + ' Status 2: ' + err.statusText + ' Message 1: ' + err.message +  ' Message 2: ' + err.error.message );

			// Default - for differents status codes than 400 or 404 look for http status code
			var error = err.status;

			// NOT FOUND
			// A wrong api connection - 404 can only be catch by "err.message"
			if (err.status === 404)
				error = err.message;

			// BAD REQUEST	
			// 1) Look for error msg defined at the Model Anotation in api - like Post.cs
			// 2) Look for error messages defined at the api controller / service like User email already taken 
			// 3) Look for http status code 
			if (err.status === 400)
				error = err.error.errors || err.error.message || err.status;

			return throwError(error);
		}))
	}
}