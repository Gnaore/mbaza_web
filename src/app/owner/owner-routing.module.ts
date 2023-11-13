import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '', component: PanelComponent, children: [
      { path: '', redirectTo: 'transactions', pathMatch: 'full' },
      { path: 'tenant-list', component: TenantListComponent },
      { path: 'payment-list', component: PaymentListComponent },
      { path: 'messages', component: MessagesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
