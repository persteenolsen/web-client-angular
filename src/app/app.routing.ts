import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';

import { AdminPostsComponent } from './adminposts';
import { ShowPostsComponent } from './showposts';

import { CreatePostComponent } from './createpost';
import { SelectedPostComponent } from './selectedpost';

import { EditPostComponent } from './editpost';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'adminposts', component: AdminPostsComponent, canActivate: [AuthGuard] },
     
    { path: '', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
	
	{ path: 'showposts', component: ShowPostsComponent },
	
	{ path: 'editpost/:id', component: EditPostComponent },
	{ path: 'thepost/:id', component: SelectedPostComponent },
    { path: 'createpost', component: CreatePostComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);