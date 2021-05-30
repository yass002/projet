import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Role} from '../model/role';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = environment.apiUrl + '/role'

  constructor(private httpClient : HttpClient) { }


   getAll(): Observable<Role[]>{
    return this.httpClient.get<Role[]>(this.url);
  }
  save(role: Role): Observable<any>{
    return this.httpClient.post<any>(this.url, role );
  }
  update(role: Role): Observable<any>{
    return this.httpClient.put<any>(this.url, role );
  }
  delete(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.url + '/' + id );
  }


}
