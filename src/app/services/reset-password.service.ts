import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  httpOptions = {
    headers: new HttpHeaders({
      accept: 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      // 'Authorization':  'Bearer {{access_token}}'
    }),
  };
  urlG: string = '';
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = configService.urlg;
  }

  verificationEmail(data: { email: string }): Observable<any> {
    return this.httpClient.post(
      this.urlG + 'user/reset-password',
      data,
      this.httpOptions
    );
  }

  changerMdp(data: { email: string, code: string, password: string }): Observable<any> {
    return this.httpClient.post(
      this.urlG + 'user/reset-password-confirmation',
      data,
      this.httpOptions
    );
  }
}
