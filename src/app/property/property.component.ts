import { Component } from '@angular/core';
import * as Aos from 'aos';
import { BienService } from '../services/bien.service';
import { ConfigService } from '../services/config.service';

declare var $: any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent {
  constructor(private bienService: BienService,
    private configService:ConfigService) {
      this.urlg = this.configService.urlg;
    }

  touslesBiens: any;
  urlg: any;
  isLoading: boolean = false;
  
  ngOnInit(): void {
    this.allBien();
    Aos.init({
      duration: 1200,
      once: true
    });

    $(document).ready(function(){
      $('.partners-slider').owlCarousel({
        loop:true,
        autoplay:true,
        margin:24,
        nav:false,
        dots:false,
        smartSpeed: 2000,
        responsive:{
          0:{
            items:2
          },
          
          550:{
            items:3
          },		
          992:{
            items:4
          },
          1200:{
            items:6
          },
        }
      });
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    });
  }

  allBien() {
    this.isLoading = true;
    this.bienService.AllBien().subscribe((ret) => {
      this.isLoading = false;
      this.touslesBiens = ret.data;
    });
  }
}
