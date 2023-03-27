import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '@/_models';

@Injectable({ providedIn: 'root' })
export class PostService {

   		
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Post[]>(`${config.apiUrl}/posts`);
    }
    
    
    getPost(id: number) {
        return  this.http.get<SearchResults>(`${config.apiUrl}/posts/${id}`);
    }

    create( title: any, body: any ) {
	    var thepost = {title, body };
        return this.http.post<SearchResults>(`${config.apiUrl}/posts/`, thepost);
    }

    edit( id: number, p: any ) {
       
         return this.http.put<SearchResults>(`${config.apiUrl}/posts/${id}`,p );
     }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/posts/${id}`);
    }
    

}


// The interface matching the result from jsonplaceholder Web API
interface SearchResults {
   
	id: any;
    title: any;
	body: any;
}



