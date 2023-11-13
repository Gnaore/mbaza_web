import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProprieteService {
  urlG: string = '';

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = configService.urlg;
  }

  ajoutPropriete(data: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.post(this.urlG + 'propriete/create', data, { headers });
  }

  modifiPropriete(data: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.put(this.urlG + 'propriete/modif', data, { headers });
  }

  supPropriete(id: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.delete(this.urlG + 'propriete/sup/' + id, { headers });
  }

  AllPropriete(): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'propriete/all', { headers });
  }

  allProprieteByBailleur(id: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'propriete/bybailleur/'+id, { headers });
  }
  

  onePropriete(id: number): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'propriete/' + id, { headers });
  }
  

  oneproprietebyCode(id: string): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'propriete/proprietebycode/' + id, { headers });
  }

}

