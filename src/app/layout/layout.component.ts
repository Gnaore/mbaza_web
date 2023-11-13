import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService){}

  location!: Location;
  utilisateur = "";
  role = "";

  



  ngOnInit(): void {
    this.location = location;
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.utilisateur = userConnect.user.username;
    this.role = userConnect.user.userrole;
  }

  logout() {
    this.authService.logout();
    window.location.href = '';
  }

}
