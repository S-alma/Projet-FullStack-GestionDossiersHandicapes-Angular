import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent implements OnInit {

  test!: any;
  test2!: any;
  variablePourStockerLaReponseDeEnfantInfirme!: any;
  variablePourStockerLaReponseDePrestation!: any;
  declarant! : FormGroup;
  contact! : FormGroup;
  numeroDePrestation! : FormGroup;
  identificationInfirme! : FormGroup;

  constructor(private fb: FormBuilder, 
    private httpClient: HttpClient,
    private router: Router,
    ) { }

  ngOnInit(): void {
    // this.sendEmailVerification()

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

    // this.declarant.valueChanges.subscribe(console.log)
    // this.numeroDePrestation.valueChanges.subscribe(console.log)
    // this.identificationInfirme.valueChanges.subscribe(console.log)
  }
  
  onViewDeclaration(){
    if (this.declarant) {
      console.log("i am in src/app/connexion/connexion.components.ts")
      this.httpClient.post("http://127.0.0.1:8000/BeneficiaireDePrestation/", {
        numeroCnie: this.declarant.value.numeroCnie,
        nom: this.declarant.value.nom,
        prenom: this.declarant.value.prenom,
        rib: this.declarant.value.rib,
        qualification: this.declarant.value.qualification
      }).subscribe(
          response =>{
              console.log("response DECLARANT")
              console.log(response)
              this.test = response

              // Prestation
              this.httpClient.post("http://127.0.0.1:8000/Prestation/", {
                numeroPMR: this.numeroDePrestation.value.numeroPMR,
                numeroPMI: this.numeroDePrestation.value.numeroPMI,
                BeneficiaireDePrestation: this.test.id
              }).subscribe(
                  response =>{
                      console.log("response NUMERP DE PRESTATION")
                      console.log(response)
                      this.variablePourStockerLaReponseDePrestation = response
                  }
                )

              // Contact
              this.httpClient.post("http://127.0.0.1:8000/Contact/", {
                telephone: this.contact.value.telephone,
                adresse: this.contact.value.adresse,
                email: this.contact.value.email,
                BeneficiaireDePrestation: this.test.id
              }).subscribe(
                  response =>{
                      console.log("response CONTACT")
                      console.log(response)
                      this.test2 = response
                      console.log(this.test2)

                      // EnfantInfirme
                      this.httpClient.post("http://127.0.0.1:8000/EnfantInfirme/", {
                        numeroCnie : this.identificationInfirme.value.numeroCnie,
                        nom : this.identificationInfirme.value.nom,
                        prenom : this.identificationInfirme.value.prenom,
                        referencielSituation : this.identificationInfirme.value.referencielSituation,
                        dateNaissance : this.identificationInfirme.value.dateNaissance,
                        dateAdhesion : this.identificationInfirme.value.dateAdhesion,
                        codeMassar : this.identificationInfirme.value.codeMassar,
                        natureInfirmite : this.identificationInfirme.value.natureInfirmite,
                        Prestation: this.variablePourStockerLaReponseDePrestation.id

                      }).subscribe(
                          response =>{
                              console.log("response NUMERP DE ENFANT INFIRME")
                              console.log(response)
                              this.variablePourStockerLaReponseDeEnfantInfirme = response
                              localStorage.setItem('numeroCnie', this.identificationInfirme.value.numeroCnie)
                              // console.log("this.variablePourStockerLaReponseDeEnfantInfirme.value")
                              // console.log(this.variablePourStockerLaReponseDeEnfantInfirme.id)
                              localStorage.setItem('EnfantInfirme', this.variablePourStockerLaReponseDeEnfantInfirme.id)
                              console.log("localStorage")
                              console.log(localStorage.getItem('EnfantInfirme'))
                              this.router.navigate(['declarationn'])
 
                              // Send the Id to the user's email
                              this.sendEmailVerification()
                              
                          }
                      )
                              
                          }
                      )
              
        }
      )
      // console.log("this.declarant")
      // console.log(this.declarant)
    }
    
  }

  // Envoyer le ID générer au Beneficiaire
  sendEmailVerification(): void{
    
    const code: string = this.generateRandomString()
    const payLoad = {
      code: code,
      message: `You Email Verification Code ${code}`,
      subject: 'ID AUTHENTIFICATION',
      toEmail: [this.test2.email]
    }
    this.httpClient.post("http://127.0.0.1:8000/ContactEmail", payLoad).subscribe(
          response =>{
              console.log("response TestEmail")
              console.log(response)

              localStorage.setItem('ID-CONTACT', payLoad.code)
              console.log("BEFORE-match Contact, localStorage.getItem('ID-CONTACT')")
              console.log(localStorage.getItem('ID-CONTACT'))
              this.httpClient.patch('http://127.0.0.1:8000/Contact/'+this.test2.id+'/', {
                'idGenere' : localStorage.getItem('ID-CONTACT')
              }).subscribe(
                response =>{
                  console.log(response)
                })
          }
    )
  }

  // FUNNCTION TO GENERATE RANDOME ID
  generateRandomString(){
    return Math.random().toString(36).substr(2, 7);
  }
}