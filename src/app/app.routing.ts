import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';

import { AdminUsersComponent } from './users/adminusers';

import { AdminPostsComponent } from './posts/adminposts';
import { ShowPostsComponent } from './posts/showposts';

import { CreatePostComponent } from './posts/createpost';
import { SelectedPostComponent } from './posts/selectedpost';

import { EditPostComponent } from './posts/editpost';
import { EditUserComponent } from './users/edituser';
import { EditProfileComponent } from './users/editprofile';

import { CreateUserComponent } from './users/createuser';

import { LoginComponent } from './account/login';
import { RegisterUserComponent } from './account/registeruser';
import { AuthGuard } from './_helpers';

const routes: Routes = [
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'edituser/:id', component: EditUserComponent, canActivate: [AuthGuard] },
	{ path: 'editprofile/:id', component: EditProfileComponent, canActivate: [AuthGuard] },
	{ path: 'adminusers', component: AdminUsersComponent, canActivate: [AuthGuard] },
	{ path: 'createuser', component: CreateUserComponent, canActivate: [AuthGuard] },
	{ path: 'adminposts', component: AdminPostsComponent, canActivate: [AuthGuard] },

	{ path: 'editpost/:id', component: EditPostComponent, canActivate: [AuthGuard] },
	{ path: 'thepost/:id', component: SelectedPostComponent, canActivate: [AuthGuard] },
	{ path: 'createpost', component: CreatePostComponent, canActivate: [AuthGuard] },

	{ path: '', component: AboutComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'registeruser', component: RegisterUserComponent },

	{ path: 'showposts', component: ShowPostsComponent },

	// otherwise redirect to home
	{ path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);