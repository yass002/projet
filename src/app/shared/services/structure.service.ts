import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Structure} from '../model/structure';
import {TreeNode} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  private  url = environment.apiUrl + '/structure';
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }
  getParent(): Observable<Structure[]> {
    return this.httpClient.get<Structure[]>(this.url + '/parent');
  }
  save(structure: Structure): Observable<any> {
    return this.httpClient.post<any>(this.url, structure);
  }
  update(structure: Structure): Observable<any> {
    return this.httpClient.put<any>(this.url, structure);
  }
  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id);
  }
  getByParent(id: any ): Observable<Structure[]> {
    return this.httpClient.get<Structure[]>(this.url + '/parent/' + id );
  }
  getStructure( ): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.url + '/tree' );
  }
  getById(id: any): Observable<Structure> {
    return this.httpClient.get<Structure>(this.url + '/' + id);
  }
}
