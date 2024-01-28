import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FixMeLater, QRCodeElementType } from 'angularx-qrcode';
import { BailleurService } from 'src/app/services/bailleur.service';
import { ConfigService } from 'src/app/services/config.service';
import { LocataireService } from 'src/app/services/locataire.service';
import { ProprieteService } from 'src/app/services/propriete.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

elementType: "canvas" as QRCodeElementType;

declare var $: any;
@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})

export class TenantListComponent {


  constructor(
    private bailleurService: BailleurService,
    private uploadService: UploadService,
    private configService: ConfigService,
    private proprieteService: ProprieteService,
    private locataireService: LocataireService,
    private router: Router
  ) { }

  userId: number = 0
  bailleurInfo: any
  listProprietes: any
  codePropriete = "CODE PROPRIETE"
  laPropriete: any
  listLocataire: any
  url = this.configService.urlFront
  urlphotoDefault = this.configService.urlg + "defaultprofil.png"

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

  public qrCodeSrc!: SafeUrl
 


  ngOnInit(): void {
    this.initForm()
    this.getOneBailleur()

    $('.select').select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });

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
      locataireSalaire: [''],
      locataireSituationmatri: ['', Validators.required],
      locataireTel: ['', Validators.required],
      locataireTelgarant: [''],
      locataireTypecontrat: [''],
      locatairePhoto: [''],
      bailleurId: ['', Validators.required],
      proprieteCode: ['', Validators.required],
      localisation: [''],
      type: [''],
      prix: [''],
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

  submitLocataire(f: any) {
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
    /* bailleurlienCNI,
    bailleurLienPhoto,*/
  }

  onChangePropriete(event: any) {
    this.codePropriete = event.target.value
    this.proprieteService.oneproprietebyCode(this.codePropriete).subscribe(ret => {
      this.laPropriete = ret.data;
      this.localisation = this.laPropriete.proprieteAdresse
      this.type = this.laPropriete.typebien.libelleTypebien
      this.prix = this.laPropriete.proprietePrix
      this.qrcode = this.url+"tenant/pay-onlineqr/" + this.laPropriete.proprieteCode
    }, (error) => {
      if (error.status == 401) { this.router.navigateByUrl("/auth") }
      this.qrcode = ''
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
}
