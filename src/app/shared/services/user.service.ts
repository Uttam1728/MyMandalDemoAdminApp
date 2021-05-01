import { Member } from '../models/member.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }
  
  postUser(formData : FormData){
    console.log(formData);
    return this.http.post(environment.baseApiUrl+'/AddMember',formData);
  }

  searchMember(formData){
    console.log(formData);
    const params = new HttpParams().set("searchparam",JSON.stringify(formData))
    return this.http.get<Member[]>(environment.baseApiUrl+'/SearchMember', { params: params});
  }

  removeMember(id){
    console.log(id);
    return this.http.delete(environment.baseApiUrl+'/RemoveMemberById/'+id);
  }
}
