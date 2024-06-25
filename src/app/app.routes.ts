import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';

import { LayoutComponent } from 'app/layout/layout.component';
import { AuthSignInComponent } from './modules/auth/sign-in/sign-in.component';
import { AuthSignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { LandingHomeComponent } from './modules/landing/home/home.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'


    {
        path: '', component: LandingHomeComponent,

    },

    {
        path: 'login', component: AuthSignInComponent,

    },
    {
        path: 'signUp', component: AuthSignUpComponent,

    },
    // Auth routes for guests

    // Admin routes
    {
        path: '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'admin', loadChildren: () => import('app/modules/admin/example.routes')},
        ]
    },
    {
        path: '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'user', loadChildren: () => import('app/modules/user/user.routes')},
        ]
    }
];
