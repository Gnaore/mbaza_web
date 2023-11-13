import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

declare var $: any;
@Component({
  selector: 'app-pay-online',
  templateUrl: './pay-online.component.html',
  styleUrls: ['./pay-online.component.scss']
})
export class PayOnlineComponent implements OnInit {
  items: MenuItem[] | undefined;

  activeIndex: number = 0;

  ngOnInit(): void {
    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });
    
    this.items = [
      {
        label: 'Identité',
        icon: 'pi pi-fw pi-user'
      },
      {
        label: 'Montant',
        icon: 'pi pi-fw pi-money'
      },
      {
        label: 'Paiement',
        icon: 'pi pi-fw pi-credit-card'
      },
      {
        label: 'E-reçu',
        icon: 'pi pi-fw pi-invoice'
      }
    ];
  }
}
