import {Component, OnInit} from '@angular/core';

import {ConfirmationService, MessageService} from 'primeng/api';
import {Groupe} from '../../shared/model/groupe';
import {GroupeService} from '../../shared/services/groupe.service';
import {ApplicationService} from '../../shared/services/application.service';
import {Application} from '../../shared/model/application';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {
  groupes: Groupe[] = [];
  applications: Application[];
  display = false;
  displayApplication = false;
  groupe = new Groupe();
  selectedApplication: Application[];

  constructor(private groupeService: GroupeService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllApplication();
  }

  getAll(): void {
    this.groupeService.getAll().subscribe(data => {
      this.groupes = data;
    }, ex => console.log(ex));
  }
  getAllApplication(): void {
    this.applicationService.getAll().subscribe(data => {
      this.applications = data;
    }, ex => console.log(ex));
  }

  clickAdd(): void {
    this.groupe = new Groupe();
    this.display = true;
  }

  edit(): void {
    this.groupeService.save(this.groupe).subscribe(res => {
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
    this.groupeService.save(this.groupe).subscribe(res => {
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
    if (this.groupe.id) {
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
        this.groupeService.delete(id).subscribe(res => {
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

  clickEdit(grp: Groupe): void {
    this.display = true;
    Object.assign(this.groupe, grp);
  }

  clickApplication(grp: Groupe): void {
    this.displayApplication = true;
    Object.assign(this.groupe, grp);
    this.selectedApplication = this.groupe.applications;
  }

  affecter(): void {
  this.groupe.applications = this.selectedApplication;
  this.groupeService.save(this.groupe).subscribe(res => {
    if (res.success) {
      this.displayApplication = false;
      this.getAll();
      this.messageService.add({severity: 'success', summary: res.message, detail: res.detail});
    } else {
      this.messageService.add({severity: 'warn', summary: res.message, detail: res.detail});
    }
  }, ex => console.log(ex));
  }
}
