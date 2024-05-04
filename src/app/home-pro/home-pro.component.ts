import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MbaazaserviceService } from "../services/mbaazaservice.service";
import { MessageService } from "primeng/api";

declare var $: any;

@Component({
  selector: "app-home-pro",
  templateUrl: "./home-pro.component.html",
  styleUrls: ["./home-pro.component.scss"],
})
export class HomeProComponent {
  messageService = inject(MessageService);
  mbaazaService = inject(MbaazaserviceService);
  textes: string[] = [
    "",
    "Je suis intéressé et j'aimerais avoir plus d'informations. Je vous remercie de bien vouloir me recontacter.",
    "Veuillez renseigner votre message.",
  ];
  choice = "0";

  nomprenoms = "";
  email = "";
  tel = "";
  message = "";
  loading = false;

  ngAfterViewInit() {
    // Initialisez Select2 dans ngAfterViewInit pour vous assurer que le DOM est prêt
    $(".select").select2();

    // Ajoutez un écouteur d'événement pour suivre les changements de sélection
    $(".select").on("change", () => {
      this.choice = $(".select").val();
    });
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
      $(".theiaStickySidebar").theiaStickySidebar({
        // Settings
        additionalMarginTop: 30,
      });

      $(".rental-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: ".slider-nav-thumbnails",
      });

      $(".slider-nav-thumbnails").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: ".rental-slider",
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
      });

      $(".rentfeature-slider").owlCarousel({
        loop: true,
        margin: 24,
        nav: false,
        dots: true,
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
    });
  }

  successtoast() {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Enregistrement Terminé ",
    });
  }
  erreurtoast(message: string) {
    this.messageService.add({
      severity: "danger",
      summary: "Erreur",
      detail: message,
    });
  }

  envoyerForm() {
    this.loading = true;
    if (
      this.choice == "0" ||
      this.nomprenoms == "" ||
      this.email == "" ||
      this.tel == "" ||
      this.message == ""
    ) {
      alert("Tous les champs sont obligatoires");
      this.loading = false;
    }
    const body = {
      demandeBesoin: this.choice,
      demandeNomprenoms: this.nomprenoms,
      demandeEmail: this.email,
      demandeTel: this.tel,
      demandeMessage: this.message,
    };
    console.log(body);
    this.mbaazaService.envoyerDemande(body).subscribe((ret) => {
      if (ret.statusCode != 200) {
        this.successtoast();
        this.reset();
      } else {
        this.erreurtoast(ret.message);
      }
      this.loading = false;
    });
  }

  reset() {
    this.choice = "0";
    this.nomprenoms = "";
    this.email = "";
    this.tel = "";
    this.message = "";
  }
}
