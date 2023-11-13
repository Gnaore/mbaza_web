import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
//import { utf8Encode } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlG: string;
  private concurentUserSubject: BehaviorSubject<object>;
  public currentUser: Observable<object>;

  constructor(
    private configService: ConfigService,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.urlG = this.configService.urlg;
    this.concurentUserSubject = new BehaviorSubject<object>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.concurentUserSubject.asObservable();
  }

  public get currentUserValue(): object {
    return this.concurentUserSubject.value;
  }

  /*
  let entetes = new HttpHeaders();
//L'écriture suivante ne fonctionne pas car l'objet ne changera pas
entetes.set('Accept-Encoding', 'gzip, deflate, sdch');
//Voici l'écriture correcte, il faut retourner l'objet dans une variable pour obtenir un header
entetes = entetes.set('Accept-Encoding', 'gzip, deflate, sdch');*/

  login(info: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',

        // 'Authorization':  'Bearer {{access_token}}'
      }),
    };

    return this.httpClient
      .post<any>(this.urlG + 'user/signin', info, httpOptions)
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.concurentUserSubject.next(user);
          }
          return user;
        })
      );
  }

 

  /* permission(jwt: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/api/Security/Authentication/PermissionTree', jwt);
  }*/

  /*repdecodejwt(jwt: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/connexion/repdecodejwt.php', jwt);
  }*/

  logout() {
    localStorage.removeItem('currentUser');
    this.concurentUserSubject.next({});
    this.router.navigate(['/auth']);
  }
}
