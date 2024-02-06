import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FixMeLater } from 'angularx-qrcode';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BailleurService } from 'src/app/services/bailleur.service';
import { ConfigService } from 'src/app/services/config.service';
import { LocataireService } from 'src/app/services/locataire.service';
import { ProprieteService } from 'src/app/services/propriete.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';
//import * as html2pdf from 'html2pdf.js';
//import * as speakeasy from 'speakeasy';

//elementType: "canvas" as QRCodeElementType;




declare var $: any;
@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class TenantListComponent {


  constructor(
    private bailleurService: BailleurService,
    private uploadService: UploadService,
    private configService: ConfigService,
    private proprieteService: ProprieteService,
    private locataireService: LocataireService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  userId: number = 0
  bailleurInfo: any
  listProprietes: any
  codePropriete = "CODE PROPRIETE"
  laPropriete: any
  listLocataire: any
  url = this.configService.urlFront
  urlg = this.configService.urlg
  urlphotoDefault = this.configService.urlg + "defaultprofil.png"
  reponse: any;

  private builder = inject(FormBuilder);
  formGroup!: FormGroup;

  previewImage: any;
  lienPhotoretour: any;
  previewImage2: any;
  lienPhotoretour2: any;
  file: any;
  fileToUpload: any;
  isLoading: boolean = false;
  nbreDispo = 0

  localisation = "";
  type: any;
  prix: any;

  qrcode = "";
  nomQrcode = ""
  urlimg = ""

  detailsPaiementDialog = false;
  modifLocataire = false;
  afficherFormulaire = false

  provisions: any[] = [];

  public qrCodeSrc!: SafeUrl



  locataires!: any[];
  vlocataireNom = "";
  vlocataireTel = "";
  vlocataireEmail = "";
  vlocataireRef = "";
  vlocatairePhoto = "";
  vproprieteCode = "";

  selectedLocataire: any[] = []
  loc = {}
  oneLocataire: any;

  dateJour = new Date
  numMoisencours = 0
  numAnneencours = 0
  numJour = 0

  ngOnInit(): void {
   this.numMoisencours = this.dateJour.getMonth() + 1
   this.numAnneencours = this.dateJour.getFullYear()
   this.numJour = this.dateJour.getDate()
  // alert(  this.numJour + "- " + this.numMoisencours + " - " + this.numAnneencours)
    this.initForm()
    this.getOneBailleur()

    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });

  }

  selectRow() {
    console.log(this.selectedLocataire);
  }

  TogglAfficheFormulaire() {
    this.afficherFormulaire = !this.afficherFormulaire
  }

  detailsPaiement(locataireRef: string, locataireNom: string, locataireTel: string, locataireEmail: string, locatairePhoto: string) {
    this.getOneLocataireByRef(locataireRef)
    this.vlocataireNom = locataireNom
    this.vlocataireTel = locataireTel
    this.vlocataireRef = locataireRef
    this.vlocataireEmail = locataireEmail
    this.vlocatairePhoto = locatairePhoto
  }

  initForm() {
    this.formGroup = this.builder.group({
      locataireId: [''],
      locataireBanque: [''],
      locataireDatenais: ['', Validators.required],
      locataireEmail: ['', [Validators.email, Validators.required]],
      locataireEmailgarant: [''],
      locataireNationalite: ['', Validators.required],
      locataireNbrecharge: [0, Validators.required],
      locataireNom: ['', Validators.required],
      locataireNomgarant: [''],
      locataireProfession: [''],
      locataireRef: [''],
      locataireSalaire: ['', Validators.required],
      locataireSituationmatri: ['', Validators.required],
      locataireTel: ['', Validators.required],
      locataireTelgarant: [''],
      locataireTypecontrat: [''],
      locatairePhoto: [''],
      bailleurId: ['', Validators.required],
      proprieteCode: ['', Validators.required],
      localisation: [''],
      locataireCaution: ['', Validators.required],
      type: [''],
      prix: [''],
    });
  }


  relance(mois: string, annee: number, locataire: any) {
    const laDate = new Date
    var body = {
      "mois": mois,
      "annee": annee,
      "locataire": locataire,
      "relance": laDate
    }
    this.bailleurService.relance(body).subscribe(ret => {
      this.reponse = ret.data
      if (this.reponse.affected > 0) {
         Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modification terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getOneLocataireByRef(locataire.locataireRef) 
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Aucune Modification',
        });
      }

    });
  }






  getOneBailleur() {
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.userId = userConnect.user.userId;
    this.bailleurService.getOneByUserId(this.userId).subscribe(ret => {
      console.log(ret.data);

      this.formGroup.controls['bailleurId'].setValue(
        ret.data.bailleurId
      );
      this.bailleurInfo = ret.data
      this.allProprieteBailleurDisponible(this.bailleurInfo.bailleurId)
      this.allLocataireByBailleur(this.bailleurInfo.bailleurId);
    }, (error) => {
      if (error.status == 401) { this.router.navigateByUrl("/auth") }
    });


  }

  getOneLocataireByRef(locataireRef: string) {
    this.isLoading = true
    this.locataireService.getProvisionByReference(locataireRef).subscribe(ret => {
      this.locataires = ret.data
      this.isLoading = false
      this.detailsPaiementDialog = true
    });
  }

  oneLocataireByRef(locataireRef: string) {
    //alert(locataireRef)
    this.isLoading = true
    this.locataireService.getOneByReference(locataireRef).subscribe(ret => {
      this.oneLocataire = ret.data

      // locataireDatenais
      //   locatairePhoto

      this.formGroup.controls['locataireId'].setValue(this.oneLocataire.locataireId);
      this.formGroup.controls['locataireBanque'].setValue(this.oneLocataire.locataireBanque);
      this.formGroup.controls['locataireDatenais'].setValue(this.oneLocataire.locataireDatenais.substring(0, 10));
      this.formGroup.controls['locataireEmail'].setValue(this.oneLocataire.locataireEmail);
      this.formGroup.controls['locataireEmailgarant'].setValue(this.oneLocataire.locataireEmailgarant);
      this.formGroup.controls['locataireNationalite'].setValue(this.oneLocataire.locataireNationalite);
      this.formGroup.controls['locataireNbrecharge'].setValue(this.oneLocataire.locataireNbrecharge);
      this.formGroup.controls['locataireNom'].setValue(this.oneLocataire.locataireNom);
      this.formGroup.controls['locataireNomgarant'].setValue(this.oneLocataire.locataireNomgarant);
      this.formGroup.controls['locataireProfession'].setValue(this.oneLocataire.locataireProfession);
      this.formGroup.controls['locataireRef'].setValue(this.oneLocataire.locataireRef);
      this.formGroup.controls['locataireSalaire'].setValue(this.oneLocataire.locataireSalaire);
      this.formGroup.controls['locataireSituationmatri'].setValue(this.oneLocataire.locataireSituationmatri);
      this.formGroup.controls['locataireTel'].setValue(this.oneLocataire.locataireTel);
      this.formGroup.controls['locataireTelgarant'].setValue(this.oneLocataire.locataireTelgarant);
      this.formGroup.controls['locataireTypecontrat'].setValue(this.oneLocataire.locataireTypecontrat);
      //this.formGroup.controls['locatairePhoto'].setValue(this.oneLocataire.locatairePhoto);
      this.lienPhotoretour = this.configService.urlg + this.oneLocataire.locatairePhoto;
      // this.formGroup.controls['bailleurId'].setValue(this.oneLocataire.bailleurId);
      this.formGroup.controls['proprieteCode'].setValue(this.oneLocataire.propriete.proprieteCode);
      // this.formGroup.controls['localisation'].setValue(this.oneLocataire.localisation);
      this.formGroup.controls['locataireCaution'].setValue(this.oneLocataire.locataireCaution);

      //  this.formGroup.controls['type'].setValue(this.oneLocataire.type);
      //  this.formGroup.controls['prix'].setValue(this.oneLocataire.prix);
      this.vproprieteCode = this.oneLocataire.propriete.proprieteCode
      //  alert(this.oneLocataire.propriete.proprieteCode)
      this.CherchePropriete(this.oneLocataire.propriete.proprieteCode)
    });
    this.vlocataireRef = locataireRef

    this.isLoading = false
    this.modifLocataire = true

  }

  allProprieteBailleurDisponible(id: any) {
    this.bailleurService.allProprieteBailleurDisponible(id).subscribe(ret => {
      this.listProprietes = ret.data
      this.nbreDispo = this.listProprietes.length
    }, (error) => {
      if (error.status == 401) { this.router.navigateByUrl("/auth") }
    });
  }

  onFileChange(event: any) {
    this.lienPhotoretour = '';
    this.file = '';
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.previewImage = file.name;
      this.fileToUpload = file;
      const formData = new FormData();
      formData.append('file', this.fileToUpload);
      this.uploadService.upload(formData).subscribe(
        (ret) => {
          this.lienPhotoretour = this.configService.urlg + ret.data;
          this.file = ret.data;
          this.isLoading = false;
        },
        (err) => {
          this.previewImage = '';
          this.isLoading = false;
        }
      );
    }
  }


  submitModifLocataire(f: any) {
    var body = {
      locataireId: parseInt(f.locataireId),
      locataireBanque: f.locataireBanque,
      locataireDatenais: f.locataireDatenais + 'T00:00:00.000Z',
      locataireEmail: f.locataireEmail,
      locataireEmailgarant: f.locataireEmailgarant,
      locataireNationalite: f.locataireNationalite,
      locataireNbrecharge: parseInt(f.locataireNbrecharge),
      locataireNom: f.locataireNom,
      locataireNomgarant: f.locataireNomgarant,
      locataireProfession: f.locataireProfession,
      locataireRef: f.locataireRef,
      locataireSalaire: parseInt(f.locataireSalaire),
      locataireSituationmatri: f.locataireSituationmatri,
      locataireTel: f.locataireTel,
      locataireTelgarant: f.locataireTelgarant,
      locataireTypecontrat: f.locataireTypecontrat,
      bailleurId: parseInt(f.bailleurId),
      proprieteCode: f.proprieteCode,
      locatairePhoto: this.file,
      localisation: f.localisation,
      locataireQrcode: this.nomQrcode,
      provisions: [],
      locataireCaution: f.locataireCaution,
      type: f.type,
      prix: parseInt(f.prix),
    };
    this.locataireService.modificationLocataire(body).subscribe(
      (ret) => {
        if (ret.data.success == true) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modification terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });

          //  this.allLocataireByBailleur(ret.data.msg.bailleur.bailleurId);
          this.formGroup.reset();
          window.location.href = '/owner/tenant-list'
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ret.data.msg,
          });
        }

      },
      (err) => {
        if (err.status == 401) {
          this.router.navigateByUrl("/auth")
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
        }

      }
    );
  }


  submitLocataire(f: any) {

    const index = f.locataireNom.substring(0, 2);

    const indexCorrige = index.replace(new RegExp(' ', 'g'), 'L')
    var codeAleatoire = Math.floor(Math.random() * 1000000) + '_' + indexCorrige;
    const reference = codeAleatoire.padStart(6, '0')
    this.qrcode = this.url + "pay-onlineqr/" + reference

    //Creation de la provision
    const date = new Date()
    const mois = date.getMonth()
    const annee = date.getFullYear()

    this.locataireService.moisrestant(mois).subscribe(ret => {

      ret.data.forEach((unmois: any) => {
        // this.provisions = [];
        this.provisions.push({
          mois: unmois.moisLibelle,
          annee: annee,
          status: false,
          idWave: "",
          locataireRef: reference,
          idWaveCallback: "",
          amount: "",
          when_completed: null,
          nummois: unmois.moisNumero
        })
      });


      var body = {
        locataireId: parseInt(f.locataireId),
        locataireBanque: f.locataireBanque,
        locataireDatenais: f.locataireDatenais + 'T00:00:00.000Z',
        locataireEmail: f.locataireEmail,
        locataireEmailgarant: f.locataireEmailgarant,
        locataireNationalite: f.locataireNationalite,
        locataireNbrecharge: parseInt(f.locataireNbrecharge),
        locataireNom: f.locataireNom,
        locataireNomgarant: f.locataireNomgarant,
        locataireProfession: f.locataireProfession,
        locataireRef: reference,
        locataireSalaire: parseInt(f.locataireSalaire),
        locataireSituationmatri: f.locataireSituationmatri,
        locataireTel: f.locataireTel,
        locataireTelgarant: f.locataireTelgarant,
        locataireTypecontrat: f.locataireTypecontrat,
        bailleurId: parseInt(f.bailleurId),
        proprieteCode: f.proprieteCode,
        locatairePhoto: this.file,
        localisation: f.localisation,
        locataireQrcode: this.nomQrcode,
        provisions: this.provisions,
        locataireCaution: f.locataireCaution,
        type: f.type,
        prix: parseInt(f.prix),
      };

      this.locataireService.ajoutLocataire(body).subscribe(
        (ret) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Enregistrement terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });

          this.allLocataireByBailleur(ret.data.bailleurId);
          this.ajoutUtilisateur(f, this.nomQrcode)


        },
        (err) => {
          if (err.status == 401) {
            this.router.navigateByUrl("/auth")
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.message,
            });
          }

        }
      );

    });
    //--------------------------

    /* bailleurlienCNI,
    bailleurLienPhoto,*/
  }

  fermer() {
    this.detailsPaiementDialog = false
    this.modifLocataire = false
  }

  onChangePropriete(event: any) {
    this.codePropriete = event.target.value
    this.proprieteService.oneproprietebyCode(this.codePropriete).subscribe(ret => {
      this.laPropriete = ret.data;
      this.localisation = this.laPropriete.proprieteAdresse
      this.type = this.laPropriete.typebien.libelleTypebien
      this.prix = this.laPropriete.proprietePrix
      // this.qrcode = this.url+"tenant/pay-onlineqr/" + this.laPropriete.proprieteCode
    }, (error) => {
      if (error.status == 401) { this.router.navigateByUrl("/auth") }

    }
    );
  }

  CherchePropriete(vproprieteCode: string) {
    this.proprieteService.oneproprietebyCode(vproprieteCode).subscribe(ret => {
      this.laPropriete = ret.data;
      this.localisation = this.laPropriete.proprieteAdresse
      this.type = this.laPropriete.typebien.libelleTypebien
      this.prix = this.laPropriete.proprietePrix
      // this.qrcode = this.url+"tenant/pay-onlineqr/" + this.laPropriete.proprieteCode
    }, (error) => {
      if (error.status == 401) { this.router.navigateByUrl("/auth") }

    }
    );
  }

  allLocataireByBailleur(bailleurId: any) {
    this.bailleurService.onebailleurincludePropr(bailleurId).subscribe(ret => {
      this.listLocataire = ret.data.locataires
    }, (error) => {
      if (error.status == 401) { this.router.navigateByUrl("/auth") }
    }
    );
  }

  ajoutUtilisateur(f: any, nomQrcode: string) {
    //alert(nomQrcode);
    this.isLoading = true;
    var body = {
      contact: f.locataireTel,
      email: f.locataireEmail,
      paysId: 1,
      role: 'LOCATAIRE',
      username: f.locataireNom,
      lienphoto: this.file,
      locataireQrcode: nomQrcode
    };

    this.locataireService.saveUser(body).subscribe(
      (result) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Creation du compte Locataire terminé avec succès',
          showConfirmButton: false,
          timer: 1500,
        });
        this.formGroup.reset();
        window.location.href = '/owner/tenant-list'
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Impossible de créer l'utilisateur lié " + err.error.message,
        });
        this.isLoading = false;
      }
    );
  }

  /*  onFileChangePropriete(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.fileToUploadPropriete = file;
        const formData = new FormData();
        formData.append('file', this.fileToUploadPropriete);
        this.uploadService.upload(formData).subscribe(
          (ret) => {
            console.log(ret);
            this.formProprieteGroup.patchValue({
              proprieteLienPhoto: ret.data
            })
            this.lienPhotoretourPropriete = this.configService.urlg + ret.data;
            // this.previewImagePropriete =  ret.data;
            this.file = ret.data;
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
            this.previewImagePropriete = '';
            this.isLoading = false;
          }
        );
      }
    }*/
  onChangeURL(urlqr: SafeUrl, parent: FixMeLater) {
    this.qrCodeSrc = urlqr
    this.saveAsImage(parent)
  }

  saveAsImage(parent: FixMeLater) {
    let parentElement = null

    parentElement = parent.qrcElement.nativeElement.querySelector("img").src

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })

      const formData = new FormData();
      formData.append('file', blob, "qrcode.png");
      this.uploadService.upload(formData).subscribe(
        (ret) => {
          this.urlimg = this.configService.urlg + ret.data;
          this.nomQrcode = ret.data;
          this.isLoading = false;
        },
        (err) => {
          this.previewImage = '';
          this.isLoading = false;
        }
      );



      /*  const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        this.urlimg  = url
        // name of the file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        link.download = "qrcode_"+uniqueSuffix;
        link.href = "assets/qrcode_"+uniqueSuffix;
        link.click()*/
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }

  fincontrat(locataireRef: string, proprieteCode: string, locataireEmail: string) {
    Swal.fire({
      title: 'Etes-vous vraiment certain ?',
      text: 'Ceci mettra fin au contrat!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, mettre fin au contrat!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true
        var body = {
          locataireRef: locataireRef,
          locataireEmail: locataireEmail,
          proprieteCode: proprieteCode
        }
        this.bailleurService.fincontrat(body).subscribe(ret => {
          this.reponse = ret.data
          if (this.reponse.success == true) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Opération terminée avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getOneBailleur()
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: this.reponse.msg,
            });
          }
        });
        this.isLoading = false
      } else {
        this.isLoading = false
        return
      }
    });


  }

  confirm1(event: Event) {
    alert("ffff")
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez-vous envoyer une alerte à votre Hussier ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  onAnnuler() {
    this.formGroup.reset();
    window.location.href = '/owner/tenant-list'
  }
}