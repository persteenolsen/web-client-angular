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
import { LoginComponent } from './login';
import { RegisterUserComponent } from './registeruser';
import { AlertComponent } from './_components';


import { CreateUserComponent } from './createuser';

import { AdminUsersComponent } from './adminusers';

import { AdminPostsComponent } from './adminposts';
import { CreatePostComponent } from './createpost';

import { EditPostComponent } from './editpost';
import { EditUserComponent } from './edituser';

import { ShowPostsComponent } from './showposts';
import { SelectedPostComponent } from './selectedpost';

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