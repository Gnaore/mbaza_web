import { group } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';


declare var $: any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private authService: AuthService) { }

  private builder = inject(FormBuilder);
  private resetPasswordService = inject(ResetPasswordService)
  private router = inject(Router)

  formGroup!: FormGroup;
  email!: FormGroup;
  isLoading: boolean = false;
  showPwd: boolean = false;
  reponse: any;
  afficheErreur: boolean = false;
  msgErreur = "En attente de vos identifiants";
  visible = false;
  error: { success: boolean, errorMessage: string } = { success: false, errorMessage: "" };


  ngOnInit(): void {
    this.initForm();
    const date = new Date();
    const mois = date.getMonth() + 1; // Les mois commencent à 0, donc on ajoute 1
    const jour = date.getDate()
    const numjour = date.getDay()
    console.log("Mois en cours :", mois, "Jour en cours :", jour, "Num Jour en cours :", numjour);
  }

  initForm() {
    this.formGroup = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });

    this.email = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
    })
  }

  login(f: any) {
    this.afficheErreur = false;
    this.isLoading = true;
    /* const loginFormData = new FormData();
     loginFormData.append('userName', f.userName);
     loginFormData.append('password', f.password);*/
    var body = {
      "email": f.email,
      "password": f.password
    };
    //console.log(body);
    this.authService.login(body).subscribe(result => {
      this.isLoading = false;
      this.reponse = result;
      console.log(this.reponse.data)
      if (this.reponse.data.succes == true) {
        window.location.href = '';
        console.log(this.reponse.data)
      } else {
      this.msgErreur = this.reponse.data.message
      console.log( this.msgErreur);
      this.afficheErreur = true;
      localStorage.clear();
     
      }

      //
      //window.location.href = '';
    }, (err) => {
      localStorage.clear();
      this.msgErreur = err.error
      console.log(err);
      this.afficheErreur = true;
      this.isLoading = false;
    });

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
