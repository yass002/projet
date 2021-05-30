import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BlankComponent} from './layouts/blank/blank.component';
import {FullComponent} from './layouts/full/full.component';
import {NavigationComponent} from './layouts/header-navigation/navigation.component';
import {SidebarComponent} from './layouts/sidebar/sidebar.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ButtonModule} from 'primeng/button';

import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmPopupModule} from 'primeng/confirmpopup';


import { TypeComponent } from './components/type/type.component';
import { StructureComponent } from './components/structure/structure.component';
import { AddEditStructureComponent } from './components/structure/add-edit-structure/add-edit-structure.component';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DelegationComponent} from './components/delegation/delegation.component';
import {GroupeComponent} from './components/groupe/groupe.component';
import {RoleComponent} from './components/role/role.component';
import {UtilisateurComponent} from './components/utilisateur/utilisateur.component';
import {ApplicationComponent} from './components/application/application.component';
import {GouvernoratComponent} from './components/gouvernorat/gouvernorat.component';
import {PrevilegeComponent} from './components/previlege/previlege.component';
import {TreeModule} from 'primeng/tree';
import {AddEditUtilisateurComponent} from './components/utilisateur/add-edit-utilisateur/add-edit-utilisateur.component';
import {InputTextModule} from 'primeng/inputtext';
import {StepsModule} from 'primeng/steps';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    GroupeComponent,
    ApplicationComponent,
    RoleComponent,
    PrevilegeComponent,
    UtilisateurComponent,
    GouvernoratComponent,
    DelegationComponent,
    TypeComponent,
    StructureComponent,
    AddEditStructureComponent,
    AddEditUtilisateurComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    PerfectScrollbarModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule,
    TooltipModule,
    ConfirmPopupModule,
    KeyFilterModule,
    TreeModule,
    InputTextModule,
    StepsModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
