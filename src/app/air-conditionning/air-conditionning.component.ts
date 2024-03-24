import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-air-conditionning',
  templateUrl: './air-conditionning.component.html',
  styleUrls: ['./air-conditionning.component.scss']
})
export class AirConditionningComponent implements OnInit {
  textes: string[] = ["", " Je suis intéressé par l'installation d'un nouveau climatiseur. Je vous prie de bien vouloir me recontacter dans les plus brefs délais.", "J'aimerais prendre un rendez-vous concernant l'entretien de mon climatiseur.", "Je suis intéressé et j'aimerais avoir plus d'informations. Je vous remercie de bien vouloir me recontacter."];
  choice: number = 0;

  ngAfterViewInit() {
    // Initialisez Select2 dans ngAfterViewInit pour vous assurer que le DOM est prêt
    $('.select').select2();

    // Ajoutez un écouteur d'événement pour suivre les changements de sélection
    $('.select').on('change', () => {
      this.choice = $('.select').val()
    });
  }
  ngOnInit(): void {
    $(document).ready(function () {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
      $('.theiaStickySidebar').theiaStickySidebar({
        // Settings
        additionalMarginTop: 30
      });

      $('.rental-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav-thumbnails'
      });

      $('.slider-nav-thumbnails').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.rental-slider',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true

      });

      $('.rentfeature-slider').owlCarousel({
        loop: true,
        margin: 24,
        nav: false,
        dots: true,
        smartSpeed: 2000,
        navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
        responsive: {
          0: {
            items: 1
          },

          768: {
            items: 1
          },
          992: {
            items: 2
          },
          1200: {
            items: 3
          },
        }
      })
    });
  }
}
