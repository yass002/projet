import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utilisateur} from '../model/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  url = environment.apiUrl + '/utilisateur'
  constructor(private httpClient: HttpClient) { }

  getall(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(this.url);
  }
  save(utilisateur: Utilisateur): Observable<any> {
    return this.httpClient.post<any>(this.url, utilisateur);
  }
  update(utilisateur: Utilisateur): Observable<any> {
    return this.httpClient.post<any>(this.url, utilisateur);
  }
  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id);
  }
  getById(id: any): Observable<any> {
    return this.httpClient.get<any>(this.url, id);
  }
}
