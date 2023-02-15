import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-suivitt',
  templateUrl: './suivitt.component.html',
  styleUrls: ['./suivitt.component.scss']
})
export class SuivittComponent implements OnInit {

  declarant! : any;
  contact! : any;
  numeroDePrestation! : any;
  identificationInfirme! : any;
  pieceARejoindre! : any;

  constructor(private fb: FormBuilder, 
    private httpClient: HttpClient,
    private router: Router,

    ) { }

  ngOnInit(): void {

    if(localStorage.getItem('ID-CONTACT')==null)
    {
      this.router.navigateByUrl('suivit');
    }

    this.declarant = this.fb.group({
      numeroCnie : '',
      nom : '',
      prenom : '',
      rib : '',
      qualification : '',
    })

    
    this.contact = this.fb.group({
      telephone : '',
      adresse : '',
      email : '',
    })

    this.numeroDePrestation = this.fb.group({
      numeroPMR : '',
      numeroPMI : '',
    })

    this.identificationInfirme = this.fb.group({
      numeroCnie : '',
      nom : '',
      prenom : '',
      referencielSituation : '',
      dateNaissance : '',
      dateAdhesion : '',
      codeMassar : '',
      natureInfirmite : '',
    })
    this.pieceARejoindre = this.fb.group({
      numeroCnie : '',
      demande : '',
      attestation : '',
      allocationsFamiliales : '',
      pensionsTemporaires : '',
    })

    this.getdata()
  }

  getdata() {
    if (localStorage.getItem('ID-CONTACT')) {
      console.log("localStorage.getItem('ID-CONTACT')")
      console.log(localStorage.getItem('ID-CONTACT'))
      this.httpClient.get("http://127.0.0.1:8000/Contact/").subscribe(
        response =>{
          
          let allContact: any = response
          console.log("allContact")
          console.log(allContact)
          for(var index1 of allContact){
            if (index1.idGenere == localStorage.getItem('ID-CONTACT')) {
              this.contact = index1
            }
          }
          if (this.contact) {
            this.httpClient.get("http://127.0.0.1:8000/BeneficiaireDePrestation/").subscribe(
              response =>{
                let allDeclarant: any = response
                for(var index2 of allDeclarant){
                  if (index2.id == this.contact.BeneficiaireDePrestation) {
                    this.declarant = index2
                  }
                }
              }
            )
          }
          if (this.contact) {
            this.httpClient.get("http://127.0.0.1:8000/Prestation/").subscribe(
              response =>{
                let allPrestation : any = response
                for(var index2 of allPrestation){
                  if (index2.BeneficiaireDePrestation == this.contact.BeneficiaireDePrestation) {
                    this.numeroDePrestation = index2
                  }
                }

                if (this.numeroDePrestation) {
                  this.httpClient.get("http://127.0.0.1:8000/EnfantInfirme/").subscribe(
                    response =>{
                      let allEnfant: any = response
                      for(var index3 of allEnfant){
                        if (index3.Prestation == this.numeroDePrestation.id) {
                          this.identificationInfirme = index3
                        }
                      }
                      
                      if (this.identificationInfirme) {
                        this.httpClient.get("http://127.0.0.1:8000/PieceARejoindre/").subscribe(
                          response =>{
                            let allPiece: any =response
                            for(var index4 of allPiece){
                              if(index4.EnfantInfirme == this.identificationInfirme.id){
                                this.pieceARejoindre = index4
                              }
                            }
                          }
                        )
                      } 

                      console.log("this.contact")
                      console.log(this.contact)
                      console.log("this.numeroDePrestation")
                      console.log(this.numeroDePrestation)
                      console.log("this.identificationInfirme")
                      console.log(this.identificationInfirme)
                      console.log("this.pieceARejoindre")
                      console.log(this.pieceARejoindre)
                    }
                    )
                }
              }
            )
          }
          
        }
      )

    } else {
      console.log("IdGenere non trouvé")
    }
  }

}
