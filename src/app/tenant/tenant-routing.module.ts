import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DueDateComponent } from './due-date/due-date.component';
import { HelpMeBankComponent } from './help-me-bank/help-me-bank.component';
import { PayOnlineComponent } from './pay-online/pay-online.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '', component: PanelComponent, children: [
      { path: '', redirectTo: 'transactions', pathMatch: 'full' },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'due-date', component: DueDateComponent },
      { path: 'help-me-bank', component: HelpMeBankComponent },
      { path: 'pay-online', component: PayOnlineComponent },
      { path: 'messages', component: MessagesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
