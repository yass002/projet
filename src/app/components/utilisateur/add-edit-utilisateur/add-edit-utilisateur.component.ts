import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../../shared/model/utilisateur';
import {UtilisateurService} from '../../../shared/services/utilisateur.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Structure} from '../../../shared/model/structure';

@Component({
  selector: 'app-add-edit-utilisateur',
  templateUrl: './add-edit-utilisateur.component.html',
  styleUrls: ['./add-edit-utilisateur.component.scss']
})
export class AddEditUtilisateurComponent implements OnInit {

  constructor(private utilisateurService: UtilisateurService,
              private messageService: MessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) { }
  user =  new Utilisateur();
  title = 'Ajoute des utilisateus';
  idUser: any;
  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
  }
  add(): void {

    this.utilisateurService.save(this.user).subscribe(res => {
      if (res.success) {
        this.messageService.add({severity: 'success', summary: res.message, detail: res.detail});
        this.router.navigate(['/utilisateur']);
      } else {
        this.messageService.add({severity: 'warn', summary: res.message, detail: res.detail});
      }
    }, ex => {
      this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
      console.log(ex);
    });
  }
  edit(): void {
    this.utilisateurService.save(this.user).subscribe(res => {
      if (res.success) {
        this.messageService.add({severity: 'success', summary: res.message, detail: res.detail});
      } else {
        this.messageService.add({severity: 'warn', summary: res.message, detail: res.detail});
      }
    }, ex => {
      this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
      console.log(ex);
    });
  }

  valider(): void {
    if (this.user.id) {
      this.edit();
    } else {
      this.add();
    }
  }
}
