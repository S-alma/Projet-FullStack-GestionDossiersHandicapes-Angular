import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CmrComponent } from './cmr/cmr.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DocumentComponent } from './documentt/document.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { SuivitComponent } from './suivit/suivit.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { DeclarationnComponent } from './declarationn/declarationn.component';
import { DeclarationnnComponent } from './declarationnn/declarationnn.component';
import { DeclarationnnnComponent } from './declarationnnn/declarationnnn.component';
import { HttpClientModule } from "@angular/common/http";

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { SuivittComponent } from './suivitt/suivitt.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    CmrComponent,
    ConnexionComponent,
    DocumentComponent,
    DeclarationComponent,
    SuivitComponent,
    FormulaireComponent,
    DeclarationnComponent,
    DeclarationnnComponent,
    DeclarationnnnComponent,
    SuivittComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
