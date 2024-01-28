import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})

export class AboutUsComponent implements OnInit {
  ngOnInit(): void {
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
      $('.dash-count .counter-up').counterUp({
        delay: 15,
        time: 1500
      });
    });
  }

}
