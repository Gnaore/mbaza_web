import { Component, Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BailleurService } from 'src/app/services/bailleur.service';
import { ConfigService } from 'src/app/services/config.service';
import { LocataireService } from 'src/app/services/locataire.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

  constructor(private formBuilder: FormBuilder,
    private bailleurService: BailleurService,
    private locataireService: LocataireService,
    private uploadService: UploadService,
    private configService: ConfigService) { 
      this.ulrG = this.configService.urlg
    }

  messages!: any[];
  selectedMessage!: any;
  formGroup!: FormGroup;
  reponse: any;
  bailleurId: any;
  userId: any

  destinataire!: any[];
  selectedDestinataire!: any[];

  public loading = false;

  libellepj: string = ""
  fileToUploadPropriete: any;
  libpj = 0
  ulrG="" 

  listemsgRecu = []
  listemsgEnvoye = []

  ngOnInit() {
    this.rechercheBailleurId();
    this.initForm();
    this.messages = [
      {
        image: 'assets/img/agents/agent-01.jpg',
        name: 'Olivier Thomasddddd',
        message: 'Un message simple',
        date: '12/01/2018'
      },
      {
        image: 'assets/img/agents/agent-01.jpg',
        name: 'Olivier Thomas',
        message: 'Un message simple',
        date: '12/01/2018'
      }
    ]
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      msgId: [''],
      msgObjet: ['', Validators.required],
      msgMessage: ['', Validators.required],
      msgLu: [false],
      expediteurId: ['', Validators.required],
      destinataireId: ['', Validators.required],
      msgLienpj:['']
    });
  }

  rechercheBailleurId() {
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.userId = userConnect.user.userId;
    this.bailleurService.getOneByUserId(this.userId).subscribe(ret => {
      this.formGroup.controls['expediteurId'].setValue(ret.data.bailleur.bailleurId)
      this.listeLocataire(ret.data.bailleur.bailleurId)
      this.listeRecepetion(ret.data.bailleur.bailleurId)
      this.listeEnvoye(ret.data.bailleur.bailleurId)
    });
  }

  listeRecepetion(bailleurId: any){
    this.bailleurService.allmsgRecuBailleur(bailleurId).subscribe(ret=>{
      this.listemsgRecu = ret.data
    });
  }

  listeEnvoye(bailleurId: any){
    this.bailleurService.allmsgEnvyeBailleur(bailleurId).subscribe(ret=>{
      this.listemsgEnvoye = ret.data
      console.log(this.listemsgEnvoye);
      console.log(this.messages);
      
    });
  }


  listeLocataire(id: any){
     this.locataireService.allLocataireByBailleur(id).subscribe(ret=>{
        this.destinataire = ret.data
     });

  }

  onSubmit(f: any) {
    this.loading = true
    f.destinataireId.forEach((element: any) => {
      var Body = {
        msgObjet: f.msgObjet,
        msgMessage: f.msgMessage,
        msgLu: f.msgLu,
        expediteurId: f.expediteurId,
        destinataireId: element.locataireId,
        msgLienpj: f.msgLienpj
      }
      this.bailleurService.ajoutMsg(Body).subscribe(ret => {
        this.reponse = ret;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Message envoye avec succès',
          showConfirmButton: false,
          timer: 1500,
        });
        this.loading = false
        this.formReset()
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.statusText,
        });
        this.loading = false
      });
});

  

   
  }

  formReset() {
    this.formGroup.reset()
    this.libpj = 0
    this.rechercheBailleurId()

  }



  onFileChangeContrat(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileToUploadPropriete = file;
      const formData = new FormData();
      formData.append('file', this.fileToUploadPropriete);
      this.uploadService.upload(formData).subscribe(
        (ret) => {
          console.log(ret);
          //this.libelleContrat = this.configService.urlg + ret.data;
          this.libellepj = ret.data;
          this.libpj = 1
          this.formGroup.controls['msgLienpj'].setValue(ret.data);
        },
        (err) => {
          console.log(err);
          this.libellepj = '';
          this.libpj = 0
        }
      );
    }
  }

  supContrat(libelleContrat: any) {
    alert(libelleContrat)
    this.libpj = 0
  }


  openDoc(libelleContrat: any) {
    window.open(this.configService.urlg + libelleContrat, '_blank')
  }

}