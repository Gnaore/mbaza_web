import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { PanelComponent } from './panel/panel.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { MessagesComponent } from './messages/messages.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';
import { QRCodeModule } from 'angularx-qrcode';
import { DialogModule } from 'primeng/dialog';
import {ContextMenuModule} from 'primeng/contextmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { NgxPrintModule } from 'ngx-print';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [
    PanelComponent,
    TenantListComponent,
    PaymentListComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    TableModule,
    MultiSelectModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ChipModule,
    QRCodeModule,
    DialogModule,
		ContextMenuModule,
    CheckboxModule,
    NgxPrintModule,
    ConfirmDialogModule, 
    ToastModule,
    BadgeModule
  ]
})
export class OwnerModule { }
