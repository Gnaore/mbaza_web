import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  visible: boolean = true
  showPwd: boolean[] = [false].constructor(2);

  formGroup!: FormGroup;
  private builder = inject(FormBuilder);
  private resetPasswordService = inject(ResetPasswordService);
  error: { success: boolean, errorMessage: string } = { success: false, errorMessage: "" };

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formGroup = this.builder.group({
      email: [history.state.email],
      code: ['', Validators.required],
      mdp: ['', Validators.required],
      confirmMdp: ['', Validators.required],
    })


  }

  submit() {
    this.error.success = false;
    this.error.errorMessage = "";
    const data: any = {
      email: this.formGroup.get('email')?.value,
      code: this.formGroup.get('code')?.value,
      password: this.formGroup.get('mdp')?.value
    }
    if (this.formGroup.get('confirmMdp')?.value === this.formGroup.get('mdp')?.value) {
      this.resetPasswordService.changerMdp(data).subscribe({
        next: (res) => {
          if (res.data.success) {
            window.location.href = '/auth';
          } else {
            this.error.success = true;
            this.error.errorMessage = res.data.msg;
          }
        },
        error: (err) => {
          this.error.success = true;
          this.error.errorMessage = err.error.message;
        }
      })
    } else {
      this.error.success = true;
      this.error.errorMessage = "Les mots de passe ne concordent pas."
    }
  }
}
