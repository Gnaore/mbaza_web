import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PropertyComponent } from './property/property.component';
import { PropertyPanelComponent } from './property-panel/property-panel.component';
import { ShowPropertyComponent } from './show-property/show-property.component';
import { TermsComponent } from './terms/terms.component';
import { PayForSomebodyComponent } from './pay-for-somebody/pay-for-somebody.component';
import { PayementSuccessComponent } from './payement-success/payement-success.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: HomeComponent },
      {
        path: 'properties', component: PropertyPanelComponent, children: [
          { path: '', component: PropertyComponent },
          { path: ':id', component: ShowPropertyComponent },
        ]
      },
      { path: 'contact-us', component: ContactComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'pay-for-somebody', component: PayForSomebodyComponent },
      { path: 'tenant', loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule) },
      { path: 'owner', loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule) },
    ]
  },
  { path: 'payment-success', component: PayementSuccessComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
