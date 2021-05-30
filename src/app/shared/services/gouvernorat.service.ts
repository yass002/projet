import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Gouvernorat} from '../model/gouvernorat';

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {
  url = environment.apiUrl + '/gouvernorat'
  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Gouvernorat[]> {
    return this.httpClient.get<Gouvernorat[]>(this.url);
  }
  save(groupe: Gouvernorat): Observable<any> {
    return this.httpClient.post<any>(this.url, groupe);
  }
  update(groupe: Gouvernorat): Observable<any> {
    return this.httpClient.post<any>(this.url, groupe);
  }
  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id);
  }
}
