import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-due-date',
  templateUrl: './due-date.component.html',
  styleUrls: ['./due-date.component.scss']
})
export class DueDateComponent {
  pdfUrl: string = "assets/file.pdf";
  ngOnInit(): void {
    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });
  }
}
