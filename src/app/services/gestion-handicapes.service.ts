import { Injectable } from "@angular/core";
import { GestionHandicapes } from "../models/gestion-handicapes.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn : 'root'
})

export class GestionHandicapesService 
{

    private REST_API_SERVER = "http://127.0.0.1:8000/"

    constructor(
        private httpClient: HttpClient
    ){}

    declarant!: object;

    getAllDeclarant(): any
    {
        this.httpClient.get(this.REST_API_SERVER+"BeneficiaireDePrestation/").subscribe(
            response =>{
                console.log("response")
                console.log(response)
                this.declarant = response
            }
        )
    }
    returnDeclarant(){
        if (this.declarant) {
            
            console.log("this.declarantreturnDeclarant")
            console.log(this.declarant)
            return this.declarant;
        }
        return null
    }
}
