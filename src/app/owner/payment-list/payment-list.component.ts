import { Component} from '@angular/core';
import { BailleurService } from 'src/app/services/bailleur.service';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr, 'fr');

declare var $: any;
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent  {


  constructor(private bailleurService: BailleurService) { }

  listPayement: any
  userId: number = 0

  ngOnInit(): void {

    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.userId = userConnect.user.userId;
    this.getAllpayementbyBailleur(this.userId)

    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });

  }

  getAllpayementbyBailleur(UserId: number) {
    this.bailleurService.getOneByUserId(UserId).subscribe(rep => {
      this.bailleurService.allpayementbyBailleur(rep.data.bailleurId).subscribe(ret => {
        this.listPayement = ret.data[0].wcallbacks
        console.log(this.listPayement);
      })
    })

  }

}
