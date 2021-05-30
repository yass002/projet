import { Component, OnInit } from '@angular/core';
import {Groupe} from '../../shared/model/groupe';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Structure} from '../../shared/model/structure';
import {StructureService} from '../../shared/services/structure.service';
import {GouvernoratService} from '../../shared/services/gouvernorat.service';
import {DelegationService} from '../../shared/services/delegation.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {

  structures: any[] = [];
  constructor(private structureService: StructureService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    this.structureService.getAll().subscribe(data => {
      this.structures = data;
    }, ex => console.log(ex));
  }
  remove(event: Event, id: any): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Vous etes sur de supprimer?',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.structureService.delete(id).subscribe(res => {
          if (res.success) {
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
