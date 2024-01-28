import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../loader/loader.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    SignInComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    LoaderModule,
    DialogModule
  ]
})
export class AuthModule { }
