import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PropertyComponent } from './property/property.component';
import { PropertyPanelComponent } from './property-panel/property-panel.component';
import { ShowPropertyComponent } from './show-property/show-property.component';
import { TermsComponent } from './terms/terms.component';
import { PayForSomebodyComponent } from './pay-for-somebody/pay-for-somebody.component';
import { StepsModule } from 'primeng/steps';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayementSuccessComponent } from './payement-success/payement-success.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LoaderModule } from './loader/loader.module';

import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';

import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PaymentqrcodeComponent } from './paymentqrcode/paymentqrcode.component';

registerLocaleData(localeFr);



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    ContactComponent,
    AboutUsComponent,
    PropertyComponent,
    PropertyPanelComponent,
    ShowPropertyComponent,
    TermsComponent,
    PayForSomebodyComponent,
    PayementSuccessComponent,
    PaymentFailedComponent,
    PaymentqrcodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StepsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    SplitterModule,
    SplitButtonModule,
    ToastModule,
    DialogModule
  ],
  providers: [{provide: LOCALE_ID, useValue: "fr" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
