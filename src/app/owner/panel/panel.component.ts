import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BailleurService } from 'src/app/services/bailleur.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  constructor(
    private bailleurService: BailleurService,
    private configService: ConfigService,
    private router: Router
  ) { }

  userId: number = 0
  bailleurInfo: any
  bailleurInfoSuite: any
  proprieteLibre = 0
  urlg = '';
  urlgimg = '';

  bailleurNumero: string = ""
  bailleurNomPrenoms: string = ""
  bailleurEmail: string = ""

  NBproprietes = 0
  NBlocataires = 0
  bailleurLienPhoto = ""

  ngOnInit() {
    this.getOneBailleurID()
    this.urlg = this.configService.urlg;
    this.urlgimg = this.configService.urlgimg
  }

  //reccuperer le bailleurID qui se trouve dans la table user
  getOneBailleurID() {
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.userId = userConnect.user.userId;
    this.bailleurService.getOneByUserId(this.userId).subscribe(ret => {
      this.bailleurInfo = ret.data
      this.onebailleurByBailleurId(this.bailleurInfo.bailleurId)
     
    },(error)=>{
      if(error.status == 401){this.router.navigateByUrl("/auth")}
    });
  }

  onebailleurByBailleurId(id: number) {

    this.bailleurService.onebailleurincludePropr(id).subscribe(ret => {
      this.bailleurInfoSuite = ret.data
console.log(this.bailleurInfoSuite);


      this.bailleurNumero = this.bailleurInfoSuite.bailleurNumero
      this.bailleurNomPrenoms = this.bailleurInfoSuite.bailleurNomPrenoms
      this.bailleurEmail = this.bailleurInfoSuite.bailleurEmail

      this.NBproprietes = this.bailleurInfoSuite.proprietes.length
      this.NBlocataires = this.bailleurInfoSuite.locataires.length
      this.bailleurLienPhoto = this.bailleurInfoSuite.bailleurLienPhoto

      this.proprieteLibre = this.bailleurInfoSuite.proprietes.length - this.bailleurInfoSuite.locataires.length
    },(error)=>{
      if(error.status == 401){this.router.navigateByUrl("/auth")}
    });
  }
}

