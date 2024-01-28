import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { PanelComponent } from './panel/panel.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DueDateComponent } from './due-date/due-date.component';
import { HelpMeBankComponent } from './help-me-bank/help-me-bank.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PayOnlineComponent } from './pay-online/pay-online.component';
import { MessagesComponent } from './messages/messages.component';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { LoaderModule } from '../loader/loader.module';
import { PayOnlineqrComponent } from './pay-onlineqr/pay-onlineqr.component';

@NgModule({
  declarations: [
    PanelComponent,
    TransactionsComponent,
    DueDateComponent,
    HelpMeBankComponent,
    PayOnlineComponent,
    MessagesComponent,
    PayOnlineqrComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TenantRoutingModule,
    NgxExtendedPdfViewerModule,
    StepsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ChipModule,
    LoaderModule,
  ]
})
export class TenantModule { }
