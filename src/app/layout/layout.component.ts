import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';
import { ConfigService } from '../services/config.service';
import { LocataireService } from '../services/locataire.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [MessageService]
})
export class LayoutComponent implements OnInit {


  constructor(private authService: AuthService,
    private messageService: MessageService,
    private resetPasswordService: ResetPasswordService,
    private confService: ConfigService,
    private locataireService: LocataireService,
    private router: Router) {
    this.items = [
      {
        label: 'Changer mon Mot de Passe',
        icon: 'pi pi-refresh',
        routerLink: ['/setup']
      },
      {
        separator: true
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
        }
      }];
    
  }
  items: MenuItem[] | undefined;
  location!: Location;
  utilisateur = "";
  role = "";
  visible: boolean = false;
  locataireCode = ""
  userEmail = ""
  infoLocataire: any

  email!: FormGroup;
  formGroup!: FormGroup;
  private builder = inject(FormBuilder);

  error: { success: boolean, errorMessage: string } = { success: false, errorMessage: "" };


  ngOnInit(): void {
    this.initForm();
    this.location = location;
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.utilisateur = userConnect.user.username;
    this.role = userConnect.user.userrole;
    this. onelocataireByEmail();
  }

  onelocataireByEmail() {
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.userEmail = userConnect.user.useremail;
    if ( userConnect.user.userrole =  "LOCATAIRE") {
      this.locataireService.onelocataireByEmail(this.userEmail).subscribe(rep => {
        this.infoLocataire = rep.data
        this.locataireCode = this.infoLocataire.locataireRef
      })
    }
  }

  initForm() {
    this.formGroup = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });

    this.email = this.builder.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  logout() {
    this.authService.logout();
    window.location.href = '';
  }

  verifEmail() {
    const email = { email: this.email.get('email')?.value }
    this.error.success = false;
    this.error.errorMessage = "";

    this.resetPasswordService.verificationEmail(email).subscribe(rep => {
      if (rep.data.success) {
        this.router.navigate(['auth/reset-password'], { state: { email: this.email.get('email')?.value } });
      } else {
        this.error.success = true;
        this.error.errorMessage = rep.data.msg
      }
    })
  }

}
