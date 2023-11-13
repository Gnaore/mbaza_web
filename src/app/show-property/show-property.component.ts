import { Component } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-show-property',
    templateUrl: './show-property.component.html',
    styleUrls: ['./show-property.component.scss']
})
export class ShowPropertyComponent {
    ngOnInit(): void {
        $(document).ready(function () {
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
