import { Component, OnInit } from '@angular/core';
import { GestionHandicapes } from '../models/gestion-handicapes.model';
import { GestionHandicapesService } from '../services/gestion-handicapes.service';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  myForm! : FormGroup;
  declarant!: any;

  constructor( private gestionHandicapesService: GestionHandicapesService, 
    private httpClient: HttpClient,
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    // this.declarant = this.gestionHandicapesService.getAllDeclarant();
    // console.log("i am in src/app/connexion/connexion.components.ts")
    // console.log("this.gestionHandicapesService.getAllDeclarant();")
    // console.log(this.gestionHandicapesService.getAllDeclarant())
    // console.log("this.gestionHandicapesService.returnDeclarant();")
    // console.log(this.gestionHandicapesService.returnDeclarant())
    // console.log("this.declarant")
    // console.log(this.declarant)
    this.getAllDeclarant()

    const connexion = this.fb.group({
      id : [],
      nom : [],
      prenom : [],
    })

    this.myForm = this.fb.group({
      id : "",
      nom : "",
      prenom : ""
    })
    
    this.myForm.valueChanges.subscribe(console.log)
  }

  getAllDeclarant(): any
  {
    console.log("i am in src/app/connexion/connexion.components.ts")
      this.httpClient.get("http://127.0.0.1:8000/BeneficiaireDePrestation/").subscribe(
          response =>{
              console.log("response")
              console.log(response)
              this.declarant = response
          }
      )
      console.log("this.declarant")
      console.log(this.declarant)
  }

}
