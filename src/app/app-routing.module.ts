import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FullComponent} from './layouts/full/full.component';


import {TypeComponent} from './components/type/type.component';
import {StructureComponent} from './components/structure/structure.component';
import {AddEditStructureComponent} from './components/structure/add-edit-structure/add-edit-structure.component';
import {DelegationComponent} from './components/delegation/delegation.component';
import {GroupeComponent} from './components/groupe/groupe.component';
import {RoleComponent} from './components/role/role.component';
import {UtilisateurComponent} from './components/utilisateur/utilisateur.component';
import {ApplicationComponent} from './components/application/application.component';
import {GouvernoratComponent} from './components/gouvernorat/gouvernorat.component';
import {PrevilegeComponent} from './components/previlege/previlege.component';
import {AddEditUtilisateurComponent} from './components/utilisateur/add-edit-utilisateur/add-edit-utilisateur.component';

const routes: Routes = [
  {path: '', component: FullComponent, children: [
      {path: 'groupe', component: GroupeComponent},
      {path : 'application' , component: ApplicationComponent},
      {path : 'role' , component: RoleComponent},
      {path : 'previlege' , component: PrevilegeComponent},
      {path : 'utilisateur' , component: UtilisateurComponent},
      {path : 'utilisateur/new', component: AddEditUtilisateurComponent},
      {path : 'utilisateur/edit/:id', component: AddEditUtilisateurComponent},
      {path : 'gouvernorat' , component: GouvernoratComponent},
      {path : 'delegation/:id' , component: DelegationComponent},
      {path : 'type' , component: TypeComponent},
      {path : 'structure' , component: StructureComponent},
      {path : 'structure/new' , component: AddEditStructureComponent},
      {path : 'structure/edit/:id' , component: AddEditStructureComponent},
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
