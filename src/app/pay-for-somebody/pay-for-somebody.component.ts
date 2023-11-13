import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LocataireService } from '../services/locataire.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-pay-for-somebody',
  templateUrl: './pay-for-somebody.component.html',
  styleUrls: ['./pay-for-somebody.component.scss']
})
export class PayForSomebodyComponent {
  constructor(private locataireService: LocataireService) { }

  items: MenuItem[] | undefined;

  activeIndex: number = 0;

  referenceLocataire = ""
  infosLocataire: any
  montantpayer: number = 0
  selectedMonth: string = ""
  proprieteId: number = 0

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

  getOneByReference() {

    // alert(this.referenceLocataire)
    this.locataireService.getOneByReference(this.referenceLocataire).subscribe(ret => {
      console.log(ret.data)
      if (ret.data) {
        this.activeIndex = 1
        this.infosLocataire = ret.data
        this.montantpayer = this.infosLocataire.propriete.proprietePrix
        this.proprieteId = this.infosLocataire.propriete.proprieteId

      } else {
        this.activeIndex = 0
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "La reference du locataire est introuvable",
        });
      }

    }, (err) => {
      this.activeIndex = 0
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
      });

    });
  }
  suivanta2() {
    if (this.selectedMonth == "" || this.montantpayer == 0 || !this.montantpayer) {
      alert("Choisissez le mois et le montant ä relger")
    } else {
      this.activeIndex = 2
    }

  }

  payer() {
    var body = {
      amount: this.montantpayer.toString(),
      currency: "XOF",
      error_url: "https://mbaaza.com/payment-failed#ZWNoZWM=",
      success_url: "https://mbaaza.com/payment-success#c3VjY2Vzcw==",
      proprieteId: this.proprieteId,
      locataireRef: this.referenceLocataire,
      mois: this.selectedMonth
    };

    this.locataireService.payer(body).subscribe(
      (ret) => {

        window.location.href = ret.wave_launch_url;
        this.activeIndex = 3
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
        });
      }
    );

  }
}
