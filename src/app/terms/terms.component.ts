import { Component } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {
  ngOnInit(): void {
    Aos.init({
      duration: 1200,
      once: true
    })
  }
}
