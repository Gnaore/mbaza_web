import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocataireService {
  urlG: string = '';

  httpOptions = {
    headers: new HttpHeaders({
      accept: 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      // 'Authorization':  'Bearer {{access_token}}'
    }),
  };

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

  modificationLocataire(data: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.put(this.urlG + 'locataire/modif', data, { headers });
  }

  allLocataireByBailleur(id: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'locataire/bailleur/' + id, { headers });
  }

  getOneByReference(id: any): Observable<any> {
    /*  const currentUser = localStorage.getItem('currentUser');
      const currentUserJSON = JSON.parse(currentUser!.toString());
    
      const headers = new HttpHeaders({
        Authorization: `Bearer ${currentUserJSON.token}`,
      });*/
    return this.httpClient.get(this.urlG + 'locataire/reference/' + id);
  }

  getProvisionByReference(id: any): Observable<any> {
      const currentUser = localStorage.getItem('currentUser');
      const currentUserJSON = JSON.parse(currentUser!.toString());
    
      const headers = new HttpHeaders({
        Authorization: `Bearer ${currentUserJSON.token}`,
      });
    return this.httpClient.get(this.urlG + 'locataire/provision/' + id, { headers });
  }

  payer(data: any): Observable<any> {
    return this.httpClient.post(this.urlG + 'wcallback/payementtiers', data);
  }

  saveUser(data: any): Observable<any> {
    return this.httpClient.post(
      this.urlG + 'user/signup',
      data,
      this.httpOptions
    );
  }

  onelocataireByEmail(email: string): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + "locataire/email/" + email, { headers })
  }


  allmsgRecuLocataire(id: number): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'msg/reculoc/' + id, { headers });
  }

  allmsgEnvyeLocataire(id: number): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'msg/envoyeloc/' + id, { headers });
  }


  moisrestant(moisEncours: number): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + "mois/" + moisEncours, { headers })
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
