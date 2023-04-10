import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { LoginComponent } from './account/login';
import { RegisterUserComponent } from './account/registeruser';
import { AlertComponent } from './_components';


import { CreateUserComponent } from './users/createuser';

import { AdminUsersComponent } from './users/adminusers';

import { AdminPostsComponent } from './posts/adminposts';
import { CreatePostComponent } from './posts/createpost';

import { EditPostComponent } from './posts/editpost';
import { EditUserComponent } from './users/edituser';
import { EditProfileComponent } from './users/editprofile';

import { ShowPostsComponent } from './posts/showposts';
import { SelectedPostComponent } from './posts/selectedpost';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
		EditUserComponent,
		EditProfileComponent,
        AboutComponent,
		AdminUsersComponent,
		CreateUserComponent,
		AdminPostsComponent,
		ShowPostsComponent,
		CreatePostComponent,
		EditPostComponent,
		SelectedPostComponent,
		LoginComponent,
        RegisterUserComponent,
        AlertComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
       // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };