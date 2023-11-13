import { Component } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  ngOnInit(): void {
    $(document).ready(function(){
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    });
  }
}
