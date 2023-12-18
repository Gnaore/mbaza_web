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
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ChipModule
  ]
})
export class OwnerModule { }
