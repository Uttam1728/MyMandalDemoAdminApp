import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mandal } from '../models/mandal.model';

@Injectable({
  providedIn: 'root'
})
export class MandalService {
  constructor(private http: HttpClient) { }

  postMandal(formData : FormData){
    console.log(formData);
    return this.http.post(environment.baseApiUrl+'/AddMandal',formData);
  }

  searchMandal(formData){
    console.log(formData);
    const params = new HttpParams().set("searchparam",JSON.stringify(formData))
    return this.http.get<Mandal[]>(environment.baseApiUrl+'/SearchMandal', { params: params});
  }

  removeMandal(id){
    console.log(id);
    return this.http.delete(environment.baseApiUrl+'/RemoveMandalById/'+id);
  }

  getAllMandalnames(){
    return this.http.get(environment.baseApiUrl+'/getAllMandalsNameAndId')
  }
}
