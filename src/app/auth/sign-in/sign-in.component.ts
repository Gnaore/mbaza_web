import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


declare var $: any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private authService: AuthService){}

  private builder = inject(FormBuilder);

  formGroup!: FormGroup;
  isLoading: boolean = false;
  showPwd: boolean = false;
  reponse: any;
  afficheErreur: boolean = false;
  msgErreur="En attente de vos identifiants";

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(f: any){
    this.afficheErreur = false;
    this.isLoading = true;
   /* const loginFormData = new FormData();
    loginFormData.append('userName', f.userName);
    loginFormData.append('password', f.password);*/
    var body = {
      "email":  f.email,
      "password": f.password 
    };
      //console.log(body);
    this.authService.login(body).subscribe(result => {
      this.reponse = result;
      console.log(this.reponse)
      //this.router.navigate(['/tableaudebord']);
      window.location.href = '';
    }, (err) => {
      localStorage.clear();
      this.msgErreur = err.error.message
      console.log(err);
      this.afficheErreur = true;
      this.isLoading = false;
    });

  }


  
  logout() {
    this.authService.logout();
    window.location.href = '';
  }

}
