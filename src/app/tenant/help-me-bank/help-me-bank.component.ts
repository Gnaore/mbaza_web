import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-help-me-bank',
  templateUrl: './help-me-bank.component.html',
  styleUrls: ['./help-me-bank.component.scss']
})
export class HelpMeBankComponent {
  ngOnInit(): void {
    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });
  }
}
