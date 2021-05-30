import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../shared/model/utilisateur';
import {UtilisateurService} from '../../shared/services/utilisateur.service';
import {Groupe} from '../../shared/model/groupe';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  constructor(private utilisateurService: UtilisateurService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
  ) { }

  utilisateurs: Utilisateur[] = [];
  display = false;
  user =  new Utilisateur();

  ngOnInit(): void {
  this.getAll();
  }
  getAll(): void{
    this.utilisateurService.getall().subscribe(
      (data) => {
        this.utilisateurs = data; } ,
      (err) => {console.log(err); }
    );
  }



  remove(event: Event, id: any): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Vous etes sur de supprimer?',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.utilisateurService.delete(id).subscribe(res => {
          if (res.success) {
            this.display = false;
            this.getAll();
            this.messageService.add({severity: 'success', summary: res.message, detail: res.detail});
          } else {
            this.messageService.add({severity: 'warn', summary: res.message, detail: res.detail});
          }
        }, ex => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
          console.log(ex);
        });
      }
    });

  }



}
