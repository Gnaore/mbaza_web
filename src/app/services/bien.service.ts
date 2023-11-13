import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BienService {
urlG: string = '';

constructor(
  private configService: ConfigService,
  private httpClient: HttpClient
) {
  this.urlG = configService.urlg;
}

ajoutBien(data: any): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.post(this.urlG + 'bien/create', data, { headers });
}

modifiBien(data: any): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.put(this.urlG + 'bien/modif', data, { headers });
}

supBien(id: any): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.delete(this.urlG + 'bien/sup/' + id, { headers });
}

AllBien(): Observable<any> {
 
  return this.httpClient.get(this.urlG + 'bien/allweb');
}

oneBien(id: number): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.get(this.urlG + 'banque/' + id, { headers });
}
}
