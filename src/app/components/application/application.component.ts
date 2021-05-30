import { Component, OnInit } from '@angular/core';

import {ConfirmationService, MessageService} from 'primeng/api';
import {Application} from '../../shared/model/application';
import {ApplicationService} from '../../shared/services/application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  applications: Application[] = [];
  display = false;
  application = new Application();
  constructor(private applicationService: ApplicationService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.applicationService.getAll().subscribe(data => {
      this.applications = data;
    }, ex => console.log(ex));
  }

  clickAdd(): void {
    this.application = new Application();
    this.display = true;
  }

  edit(): void {
    this.applicationService.save(this.application).subscribe(res => {
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
    this.applicationService.save(this.application).subscribe(res => {
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
    if (this.application.id) {
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
        this.applicationService.delete(id).subscribe(res => {
          if (res.success) {
            // this.display = false;
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

  clickEdit(appli: Application): void {
    this.display = true;
    Object.assign(this.application, appli);
  }
}
