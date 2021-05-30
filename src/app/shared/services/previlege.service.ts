import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Previlege} from '../model/previlege';


@Injectable({
  providedIn: 'root'
})
export class PrevilegeService {

   private url = environment.apiUrl + '/previlege'



  constructor(private httpClient: HttpClient) { }
  getall(): Observable<Previlege[]>{
     return this.httpClient.get<Previlege[]>(this.url);
  }
  save(previlege: Previlege): Observable<any> {
     return this.httpClient.post<any>(this.url, previlege);
  }
  update(previlege: Previlege): Observable<any>{
     return this.httpClient.put<any>(this.url, previlege);
  }
  delete(id: any): Observable<any>{
     return this.httpClient.delete<any>(this.url + '/' + id);
  }
}
