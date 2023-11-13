import { Component } from '@angular/core';
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
    private configService: ConfigService
  ) { }

  userId: number = 0
  bailleurInfo: any
  bailleurInfoSuite: any
  proprieteLibre = 0
  urlg = '';

  ngOnInit() {
    this.getOneBailleur()
    this.urlg = this.configService.urlg;

  }

  getOneBailleur() {
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.userId = userConnect.user.userId;
    this.bailleurService.getOneByUserId(this.userId).subscribe(ret => {
      this.bailleurInfo = ret.data
      console.log(ret.data)
     // alert(this.bailleurInfo.bailleur.bailleurId)
      this.onebailleurByBailleurId(this.bailleurInfo.bailleur.bailleurId)
     
    });
  }
  onebailleurByBailleurId(id: number) {
    this.bailleurService.onebailleur(id).subscribe(ret => {
      this.bailleurInfoSuite = ret.data
      this.proprieteLibre = this.bailleurInfoSuite.proprietes.length - this.bailleurInfoSuite.locataires.length
    });
  }
}

