import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  private router = inject(Router);
  ngOnInit(): void {
    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });
  }
}
