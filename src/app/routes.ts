import { SearchUserComponent } from './user/search-user/search-user.component';
import { SearchMandalComponent } from './mandal/search-mandal/search-mandal.component';
import { AddMandalComponent } from './mandal/add-mandal/add-mandal.component';
import { MandalComponent } from './mandal/mandal.component';
import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

export const appRoutes: Routes = [
    {
        path: 'member', component: UserComponent,
        children: [
            { path: 'add', component: AddUserComponent },
            { path: 'search', component: SearchUserComponent }
        ]
    },
    {
        path: 'mandal', component: MandalComponent,
        children: [
            { path: 'add', component: AddMandalComponent },
            { path: 'search', component: SearchMandalComponent }
        ]
    },
    {
        path: '', redirectTo: '/member', pathMatch: 'full'
    }
];