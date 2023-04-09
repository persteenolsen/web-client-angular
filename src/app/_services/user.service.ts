import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    

    constructor(private http: HttpClient) { 
			
	}
    
	
    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }
    
	
    getUser(id: number) {
        return this.http.get<apiResult>(`${config.apiUrl}/users/${id}`);
    }
	
	
    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }
	
	edit(id: number, p: any) {
       
	  
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

