import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { BienService } from '../services/bien.service';
import { ConfigService } from '../services/config.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private bienService: BienService,
    private configService:ConfigService) {
      this.urlg = this.configService.urlg;
    }

  touslesBiens: any;
  urlg: any;
  isLoading: boolean = false;

  ngOnInit() {
    
    this.allBien();
    Aos.init({
      duration: 1200,
      once: true,
    });

    $(document).ready(function () {
      $('.property-type-slider').owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        dots: false,
        smartSpeed: 2000,
        navText: [
          "<i class='fa-solid fa-arrow-left'></i>",
          "<i class='fa-solid fa-arrow-right'></i>",
        ],
        navContainer: '.mynav1',
        responsive: {
          0: {
            items: 1,
          },

          550: {
            items: 2,
          },
          992: {
            items: 3,
          },
          1200: {
            items: 4,
          },
        },
      });

      $('.partners-slider').owlCarousel({
        loop: false,
        autoplay: true,
        margin: 24,
        nav: false,
        dots: false,
        smartSpeed: 2000,
        responsive: {
          0: {
            items: 2,
          },

          550: {
            items: 3,
          },
          992: {
            items: 4,
          },
          1200: {
            items: 6,
          },
        },
      });

      $('.feature-slider').owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        dots: false,
        smartSpeed: 2000,
        navText: [
          "<i class='fa-solid fa-arrow-left'></i>",
          "<i class='fa-solid fa-arrow-right'></i>",
        ],
        responsive: {
          0: {
            items: 1,
          },

          768: {
            items: 1,
          },
          992: {
            items: 2,
          },
          1200: {
            items: 3,
          },
        },
      });
    }
    
    );

    
  }

  allBien() {
    this.isLoading = true;
    this.bienService.AllBien().subscribe((ret) => {
      this.isLoading = false;
      this.touslesBiens = ret.data;
    });
  }
}
