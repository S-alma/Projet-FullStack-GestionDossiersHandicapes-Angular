import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-declarationn',
  templateUrl: './declarationn.component.html',
  styleUrls: ['./declarationn.component.scss']
})
export class DeclarationnComponent implements OnInit {

  declarant! : FormGroup;
  pieceARejoindre!: FormGroup;

  numeroCnie!: File;
  demande!: File;
  attestation!: File;
  allocationsFamiliales!: File;
  pensionsTemporaires!: File;

  constructor(private fb: FormBuilder, 
    private httpClient: HttpClient,
    private router: Router,) { }

  ngOnInit(): void {

    console.log("src/app/declarationn/declarationn.component.ts")
    console.log("localStorage.getItem('EnfantInfirme')")
    console.log(localStorage.getItem('EnfantInfirme'))

    if(localStorage.getItem('EnfantInfirme')==null)
    {
      this.router.navigateByUrl('declarationnnn');
    }

    this.declarant = this.fb.group({
      numeroCnie : '',
      nom : '',
      prenom : '',
      rib : '',
      qualification : '',
    })
    this.pieceARejoindre = this.fb.group({
      numeroCnie : '',
      demande : '',
      attestation : '',
      allocationsFamiliales : '',
      pensionsTemporaires : '',
    })

    // this.declarant.valueChanges.subscribe(console.log)
    this.pieceARejoindre.valueChanges.subscribe(console.log)
  }
  
  onNumeroCnieChange(event: any){
    this.numeroCnie = event.target.files[0];
    
    var blob = this.numeroCnie.slice(0, this.numeroCnie.size, 'image/png'); 
    var newFile = new File([blob], 'Numero_Cnie.png', {type: 'image/png'});
    this.numeroCnie = newFile;

    console.log("this.numeroCnie")
    console.log(this.numeroCnie)
    console.log("this.pieceARejoindre.numeroCnie")
    console.log(this.pieceARejoindre)
    console.log("apres this.pieceARejoindre.numeroCnie = this.numeroCnie")
    this.pieceARejoindre.value.numeroCnie = this.numeroCnie
    console.log(this.pieceARejoindre.value.numeroCnie)
  }  
  onDemandeChange(event: any){
    this.demande = event.target.files[0];

    var blob = this.demande.slice(0, this.demande.size, 'image/png'); 
    var newFile = new File([blob], 'Demande.png', {type: 'image/png'});
    this.demande = newFile;

    this.pieceARejoindre.value.demande = this.demande
    console.log("this.pieceARejoindre.value.demande")
    console.log(this.pieceARejoindre.value.demande)
  }  
  onAttestationChange(event: any){

    this.attestation = event.target.files[0];

    var blob = this.attestation.slice(0, this.attestation.size, 'image/png'); 
    var newFile = new File([blob], 'Attestation.png', {type: 'image/png'});
    this.attestation = newFile;
    
    this.pieceARejoindre.value.attestation = this.attestation
    console.log("this.pieceARejoindre.value.attestation")
    console.log(this.pieceARejoindre.value.attestation)
  }  
  onAllocationsFamilialesChange(event: any){
    this.allocationsFamiliales = event.target.files[0];

    var blob = this.allocationsFamiliales.slice(0, this.allocationsFamiliales.size, 'image/png'); 
    var newFile = new File([blob], 'Allocations_Familiales.png', {type: 'image/png'});
    this.allocationsFamiliales = newFile;
    
    this.pieceARejoindre.value.allocationsFamiliales = this.allocationsFamiliales
    console.log("this.pieceARejoindre.value.allocationsFamiliales")
    console.log(this.pieceARejoindre.value.allocationsFamiliales)
  }  
  onPensionsTemporairesChange(event: any){
    console.log("event.target.files")
    console.log(event.target.files)
    this.pensionsTemporaires = event.target.files[0];

    var blob = this.pensionsTemporaires.slice(0, this.pensionsTemporaires.size, 'image/png'); 
    var newFile = new File([blob], 'Pensions_Temporaires.png', {type: 'image/png'});
    this.pensionsTemporaires = newFile;

    this.pieceARejoindre.value.pensionsTemporaires = this.pensionsTemporaires
    console.log("this.pieceARejoindre.value.pensionsTemporaires")
    console.log(this.pieceARejoindre.value.pensionsTemporaires)
  }
   
  onValid(){
    if (this.pieceARejoindre) {
      console.log("I am insrc/app/declarationn/declarationn.components.ts/DeclarationnComponent")
      console.log("this.pieceARejoindre")
      console.log(this.pieceARejoindre.value)
      const uploadData = new FormData();
      let EnfantInfirmeId = localStorage.getItem('EnfantInfirme')
      EnfantInfirmeId == null ? uploadData.append('EnfantInfirme', '1') : uploadData.append('EnfantInfirme', EnfantInfirmeId )

      // uploadData.append('EnfantInfirme', '1')
      uploadData.append('numeroCnie', this.numeroCnie, this.numeroCnie.name)
      uploadData.append('demande', this.demande, this.demande.name)
      uploadData.append('attestation', this.attestation, this.attestation.name)
      uploadData.append('allocationsFamiliales', this.allocationsFamiliales, this.allocationsFamiliales.name)
      uploadData.append('pensionsTemporaires', this.pensionsTemporaires, this.pensionsTemporaires.name)
      console.log("i am in src/app/connexion/connexion.components.ts")
      this.httpClient.post("http://127.0.0.1:8000/PieceARejoindre/", uploadData).subscribe(
          response =>{
              console.log("response PIECE A REJOINDRE")
              console.log(response)
              localStorage.removeItem("EnfantInfirme")
              this.router.navigateByUrl('');
          }
      )
    }
  }
 
}