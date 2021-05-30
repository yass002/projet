import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DelegationService} from '../../shared/services/delegation.service';
import {Gouvernorat} from '../../shared/model/gouvernorat';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Delegation} from '../../shared/model/delegation';


@Component({
  selector: 'app-delegation',
  templateUrl: './delegation.component.html',
  styleUrls: ['./delegation.component.scss']
})
export class DelegationComponent implements OnInit {

  delegations: Delegation[] = [];
  display = false;
  delegation = new Delegation();
  idGouv: any ;
  constructor(private delegationService: DelegationService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private activatedRouter: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.idGouv = this.activatedRouter.snapshot.paramMap.get('id');
    this.getAll();
  }

  getAll(): void {
    this.delegationService.getByGouvernorat(this.idGouv).subscribe(data => {
      this.delegations = data;
    }, ex => console.log(ex));
  }

  clickAdd(): void {
    this.delegation = new Delegation();
    this.display = true;
  }

  edit(): void {
    this.delegationService.save(this.delegation).subscribe(res => {
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

  add(): void {
    const gouvernorat = new Gouvernorat();
    gouvernorat.id = this.idGouv;
    this.delegation.gouvernorat = gouvernorat;
    this.delegationService.save(this.delegation).subscribe(res => {
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

  valider(): void {
    if (this.delegation.id) {
      this.edit();
    } else {
      this.add();
    }
  }


  remove(event: Event, id: any): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Vous etes sur de supprimer?',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delegationService.delete(id).subscribe(res => {
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

  clickEdit(dele: Delegation): void {
    this.display = true;
    Object.assign(this.delegation, dele);
  }

}
