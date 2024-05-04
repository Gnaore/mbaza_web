import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MbaazaserviceService {
  http = inject(HttpClient);
  urlg = inject(ConfigService).urlg;

  envoyerDemande(body: any): Observable<any> {
    return this.http.post<any>(`${this.urlg}demande/create`, body);
  }
}
