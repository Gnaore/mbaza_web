import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocataireService { urlG: string = '';

constructor(
  private configService: ConfigService,
  private httpClient: HttpClient
) {
  this.urlG = configService.urlg;
}

ajoutLocataire(data: any): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.post(this.urlG + 'locataire/create', data, { headers });
}

allLocataireByBailleur(id: any): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.get(this.urlG + 'bailleur/' + id, { headers });
}

getOneByReference(id: any): Observable<any> {
/*  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });*/
  return this.httpClient.get(this.urlG + 'locataire/reference/' + id);
}

payer(data: any): Observable<any> {
  return this.httpClient.post(this.urlG + 'wcallback/payementtiers',  data);
}


/*
modifiBailleur(data: any): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.put(this.urlG + 'bailleur/modif', data, { headers });
}

supBailleur(id: any): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.delete(this.urlG + 'bailleur/sup/' + id, { headers });
}

AllBailleur(): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.get(this.urlG + 'bailleur/all', { headers });
}

onebailleur(id: number): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.get(this.urlG + 'bailleur/' + id, { headers });
}

getOneByUserId(id: number): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.get(this.urlG + 'user/oneuser/' + id, { headers });
}



allProprieteBailleur(id: number): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.get(this.urlG + 'propriete/bybailleur/' + id, { headers });
}

allProprieteBailleurDisponible(id: number): Observable<any> {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserJSON = JSON.parse(currentUser!.toString());

  const headers = new HttpHeaders({
    Authorization: `Bearer ${currentUserJSON.token}`,
  });
  return this.httpClient.get(this.urlG + 'propriete/dispobybailleur/' + id, { headers });
}
*/
}