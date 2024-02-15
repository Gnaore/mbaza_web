import { ChangeDetectionStrategy, Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home-pro',
  templateUrl: './home-pro.component.html',
  styleUrls: ['./home-pro.component.scss']
})
export class HomeProComponent {
  textes: string[] = ["", "Je suis intéressé et j'aimerais avoir plus d'informations. Je vous remercie de bien vouloir me recontacter.", "Veuillez renseigner votre message."];
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
