import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import {Router} from '@angular/router'
 
@Component({
  selector: 'app-declarationnnn',
  templateUrl: './declarationnnn.component.html',
  styleUrls: ['./declarationnnn.component.scss']
})
export class DeclarationnnnComponent implements OnInit {

  ID_GENERATED! : FormGroup;
  allContact!: any;
  allPrestation!: any;
  allEnfant!: any;
   
  constructor(private fb: FormBuilder, 
    private httpClient: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.ID_GENERATED = this.fb.group({
      id: '',
      notIdentic: false,
      completed: false
    })
  }
  seConnect(){
    if (this.ID_GENERATED != null && this.ID_GENERATED.value.id != null && this.ID_GENERATED.value.id != undefined) {
      this.httpClient.get("http://127.0.0.1:8000/Contact/").subscribe(
        response =>{
            console.log("response")
            console.log(response)
            this.allContact = response
            let oneContact: any = null
            for (var index1 of this.allContact) {
              // console.log(index1.idGenere); // prints indexes: 0, 1, 2, 3
              if (index1.idGenere == this.ID_GENERATED.value.id) {
                localStorage.setItem('ID-CONTACT', index1.idGenere)
                oneContact = index1

                this.httpClient.get("http://127.0.0.1:8000/Prestation/").subscribe(
                  response =>{
                    this.allPrestation = response
                    let onePrestation: any = null
                    for(var index2 of this.allPrestation){
                      if (index2.BeneficiaireDePrestation == oneContact.BeneficiaireDePrestation) {
                        onePrestation = index2
                      }
                    }
                    if (onePrestation) {
                      this.httpClient.get("http://127.0.0.1:8000/EnfantInfirme/").subscribe(
                        response =>{
                          this.allEnfant = response
                          let oneEnfant: any = null
 
                          for(var index3 of this.allEnfant){
                            if (index3.Prestation == onePrestation.id) {
                              oneEnfant = index3
                              localStorage.setItem('EnfantInfirme', index3.id)
                              console.log("4n.ts")
                              console.log("localStorage.getItem('EnfantInfirme')")
                              console.log(localStorage.getItem('EnfantInfirme'))
                            }
                          }
                          console.log("Before if  line 68") 
                          if (oneEnfant) {
                            this.httpClient.get("http://127.0.0.1:8000/PieceARejoindre/").subscribe(
                              response =>{
                                console.log("response PieceARejoindre")
                                console.log(response)
                                let allPiece: any = response
                                let onePiece: any =null
                                for(var index4 of allPiece){
                                  if (index4.EnfantInfirme == oneEnfant.id) {
                                    onePiece = index4
                                    this.ID_GENERATED.value.completed = true
                                  }
                                }
                                if (onePiece == null) {
                                  console.log("this.ID_GENERATED.value.notCompleted")
                                  console.log(this.ID_GENERATED.value.notCompleted)
                                  this.ID_GENERATED.value.completed = false
                                  this.router.navigate(['declarationn'])
                                }
                              }
                            )
                          }
                          
                        }
                      )
                    }
                  }
                )
                
              }
            }
            if(oneContact == null){
              console.log("last else")
              console.log(oneContact)
              this.ID_GENERATED.value.notIdentic = true
            }
        }
    )
    }
  }

}