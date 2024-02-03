import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { LocataireService } from 'src/app/services/locataire.service';

declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  [x: string]: any;
  private router = inject(Router);
  constructor(
    private configService: ConfigService,
    private locataireService: LocataireService) { }

  rep: any;
  locatireRef! : string;

  urlg: string = this.configService.urlg;
  url: string = this.configService.urlFront
  userConnect = JSON.parse(localStorage.getItem('currentUser')!);

  userEmail = this.userConnect.user.useremail;
  userId = this.userConnect.user.userId;
  userPhoto = this.userConnect.user.userPhoto;
  //userQrCode = this.userConnect.user.userQrCode;
  useremail = this.userConnect.user.useremail;
  username = this.userConnect.user.username;
  userrole = this.userConnect.user.userrole;

  ngOnInit(): void {
    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });
    this.getOneLocataireByEmail();
  }

  getOneLocataireByEmail() {
    this.locataireService.onelocataireByEmail(this.useremail).subscribe(ret => {
      this.rep = ret.data
      this.locatireRef = this.rep.locataireRef
    });
  }
}
