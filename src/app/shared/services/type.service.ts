import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Type} from '../model/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  url = environment.apiUrl + '/type'
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Type[]> {
    return this.httpClient.get<Type[]>(this.url);
  }
  save(type: Type): Observable<any> {
    return this.httpClient.post<any>(this.url, type);
  }
  update(type: Type): Observable<any> {
    return this.httpClient.post<any>(this.url, type);
  }
  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id);
  }
}
