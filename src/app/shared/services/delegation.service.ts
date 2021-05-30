import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Delegation} from '../model/delegation';

@Injectable({
  providedIn: 'root'
})
export class DelegationService {
  url = environment.apiUrl + '/delegation'
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Delegation[]> {
    return this.httpClient.get<Delegation[]>(this.url);
  }
  save(delegation: Delegation): Observable<any> {
    return this.httpClient.post<any>(this.url, delegation);
  }
  update(delegation: Delegation): Observable<any> {
    return this.httpClient.post<any>(this.url, delegation);
  }
  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id);
  }
  getByGouvernorat(id: any): Observable<Delegation[]> {
    return this.httpClient.get<Delegation[]>(this.url + '/gouvernorat/' +  id );
  }
}
