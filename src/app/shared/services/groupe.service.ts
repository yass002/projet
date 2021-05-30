import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Groupe} from '../model/groupe';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  private  url = environment.apiUrl + '/groupe'
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Groupe[]> {
    return this.httpClient.get<Groupe[]>(this.url);
  }
  save(groupe: Groupe): Observable<any> {
    return this.httpClient.post<any>(this.url, groupe);
  }
  update(groupe: Groupe): Observable<any> {
    return this.httpClient.post<any>(this.url, groupe);
  }
  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id);
  }
}
