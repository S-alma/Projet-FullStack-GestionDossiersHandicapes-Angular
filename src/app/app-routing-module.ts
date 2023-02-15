import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { CmrComponent } from './cmr/cmr.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { DeclarationnComponent } from './declarationn/declarationn.component';
import { DeclarationnnComponent } from './declarationnn/declarationnn.component';
import { DeclarationnnnComponent } from './declarationnnn/declarationnnn.component';
import { DocumentComponent } from './documentt/document.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { SuivitComponent } from './suivit/suivit.component';
import { SuivittComponent } from './suivitt/suivitt.component';

const routes: Routes = 
[
  {
    path : '', component : AccueilComponent
  },
  {
      path : 'cmr', component : CmrComponent
  },
  {
    path : 'documentation', component : DocumentComponent
  },
  {
      path : 'connexion', component : ConnexionComponent
  },
  {
    path : 'declaration', component : DeclarationComponent
  },
  {
      path : 'suivit', component : SuivitComponent
  },
  {
    path : 'suivitt', component : SuivittComponent
  },
  {
    path : 'formulaire', component : FormulaireComponent
  },
  {
    path : 'declarationn', component : DeclarationnComponent
  },
  {
    path : 'declarationnn', component : DeclarationnnComponent
  },
  {
    path : 'declarationnnn', component : DeclarationnnnComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
