import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public selectedUser: User = {
    memberFirstName : '',
    memberMiddleName : '',
    memberLastName : '',
    memberImgSrc : '',
    memberEmail : '',
    memberMobileNumbers : null,
    memberAddress : '',
    withdrawal : 0,
    password : '',
    createdBy  : ''
  };
  constructor(private http: HttpClient) { }
  
  postUser(user: User){
    return this.http.post(environment.baseApiUrl+'/AddMember',user);
  }
}
