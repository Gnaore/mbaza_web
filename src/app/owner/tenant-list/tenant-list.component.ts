import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BailleurService } from 'src/app/services/bailleur.service';
import { ConfigService } from 'src/app/services/config.service';
import { LocataireService } from 'src/app/services/locataire.service';
import { ProprieteService } from 'src/app/services/propriete.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

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
    private locataireService: LocataireService
  ) { }

  userId: number = 0
  bailleurInfo: any
  listProprietes: any
  codePropriete = "CODE PROPRIETE"
  laPropriete: any
  listLocataire: any 
  url = this.configService.urlg
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
      this.formGroup.controls['bailleurId'].setValue(
        ret.data.bailleur.bailleurId
      );

      this.bailleurInfo = ret.data.bailleur
    

    
      this.allProprieteBailleurDisponible(this.bailleurInfo.bailleurId)
      this.allLocataireByBailleur(this.bailleurInfo.bailleurId);
    });


  }

  allProprieteBailleurDisponible(id: any) {
    this.bailleurService.allProprieteBailleurDisponible(id).subscribe(ret => {
      this.listProprietes = ret.data
      this.nbreDispo = this.listProprietes.length
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
          console.log(ret);
          this.lienPhotoretour = this.configService.urlg + ret.data;
          this.file = ret.data;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
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
        this.formGroup.reset();

      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
        });
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
    });
  }


  allLocataireByBailleur(bailleurId: any) {
    this.bailleurService.onebailleur(bailleurId).subscribe(ret => {
      this.listLocataire = ret.data.locataires
      console.log(this.listLocataire)
    });
  }


}
