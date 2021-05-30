import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Application} from '../model/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private  url = environment.apiUrl + '/application'
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(this.url);
  }
  save(application: Application): Observable<any> {
    return this.httpClient.post<any>(this.url, application);
  }
  update(application: Application): Observable<any> {
    return this.httpClient.post<any>(this.url, application);
  }
  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id);
  }
}


