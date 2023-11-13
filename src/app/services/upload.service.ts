import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  urlG: string = '';

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = configService.urlg;
  }

  upload(data: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.post(this.urlG + 'upload/file', data, { headers });
  }

  
}
