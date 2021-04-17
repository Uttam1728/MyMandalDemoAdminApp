import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: AddUserComponent }]
    },
    {
        path: '', redirectTo: '/signup', pathMatch: 'full'
    }
];