import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  //**en dev mac
 // urlg = 'http://localhost:3000/'
 // urlFront = "http://localhost:4200/"

  //EN PROD HEROKU
  //urlg = 'https://mbaza-eb3d8ec0412e.herokuapp.com/'
  //urlFront = "https://mbaaza.com/"

  //EN PROD LWS
  urlg = 'https://apimbaza.mbaaza.com/'
  urlFront = "https://mbaaza.com/"
  urlgimg = 'https://apimbaza.mbaaza.com/files/'

  //EN PROD VERCEL
  // urlg = 'https://mbaza-api.vercel.app/'
  // urlFront = "https://mbaaza.com/"


  

    //*sur server distant
    //urlg = 'https://apimbaza.empreinte-ci.net/';
    // urlg = 'https://apiparcauto.afinov.com';
    //urlg = 'http://10.102.0.25:3000/'; //API RTI
    // urlTrombino = 'http://172.16.2.16:8060';
    // urlgestock = 'http://172.16.2.16:8020';

  idUser = localStorage.getItem('id');
  locataireCode: any;
  var_Reattribution: any;
  MesTickets: boolean = false;
  MesAttributions: boolean = false;
  GestionTickets: boolean = false;
  Referentiel: boolean = false;
  Administration: boolean = false;

  constructor() { }
}
