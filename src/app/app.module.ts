import { MandalService } from './shared/services/mandal.service';
// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//Nz
import { IconsProviderModule } from './icons-provider.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NzUploadModule } from 'ng-zorro-antd/upload';


// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
//routes
import { appRoutes } from './routes';
import { FormsModule } from '@angular/forms';
import { MandalComponent } from './mandal/mandal.component';
import { AddMandalComponent } from './mandal/add-mandal/add-mandal.component';
import { AddMemberAdminToMandalComponent } from './user/add-member-admin-to-mandal/add-member-admin-to-mandal.component';
import { AddMemberToMandalComponent } from './user/add-member-to-mandal/add-member-to-mandal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SearchMandalComponent } from './mandal/search-mandal/search-mandal.component';

import { SearchUserComponent } from './user/search-user/search-user.component';

import { MandalNgZorroAntdModule } from './ng-zorrow-antd.module';


registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    MandalComponent,
    AddMandalComponent,
    AddMemberAdminToMandalComponent,
    AddMemberToMandalComponent,
    WelcomeComponent,
    SearchMandalComponent,
    SearchUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IconsProviderModule,
    
    BrowserAnimationsModule,
    
    MandalNgZorroAntdModule,
    
   
  ],
  providers: [MandalService,
    { provide: NZ_I18N, useValue: en_US },
    // {provide: LOCALE_ID, useValue: 'USD'},
    NzMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
