import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    localStorage.removeItem("EnfantInfirme")
    localStorage.removeItem("ID-CONTACT")
  }

}
