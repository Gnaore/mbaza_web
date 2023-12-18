import { Component, inject } from '@angular/core';
import { LocataireService } from 'src/app/services/locataire.service';

declare var $: any;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  constructor(private locataireService: LocataireService) { }

  userEmail: string = ""
  infoLocataire: any = ""


  ngOnInit(): void {
    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });

    this.onelocataireByEmail()
  }

  onelocataireByEmail() {
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.userEmail = userConnect.user.useremail;

    this.locataireService.onelocataireByEmail(this.userEmail).subscribe(rep => {
      this.infoLocataire = rep.data
      
    })
  }
}
