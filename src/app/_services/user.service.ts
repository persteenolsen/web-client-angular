import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    
	// For internal notifications between components
	private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) { 
	    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
	}
    
	
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
	
    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }
    
	
	// Not used at the mooment
    getUser(id: number) {
        return this.http.get<apiResult>(`${config.apiUrl}/users/${id}`);
    }
	// Not in use for now
    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }
	
	edit(id: number, p: any) {
       
	   // NOTE: When using the lines belows and saving changes to this method ( EDIT USER ) in dev-mode there will be a LOGOUT !
	   // It is not totally corect to set the user (client-side) before changing the User at the DB!
	   // store user details and jwt token in local storage to keep user logged in between page refreshes !!
        localStorage.setItem('currentUser', JSON.stringify(p));
        this.currentUserSubject.next(p);
	   
	   return this.http.put<apiResult>(`${config.apiUrl}/users/${id}`, p)
		
      }
	
    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}


// The interface matching the result from the Web API
// Note: Remember that the returned values will never start with a capital letter like the User Model at the Web API !
interface apiResult {

    id: any;
	email: any;
    Password: any;
	
    title: any;
	
    firstName: any;
    lastName: any;

	role: any;
    token: any;
	
}

