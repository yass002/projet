import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Gouvernorat} from '../../shared/model/gouvernorat';
import {GouvernoratService} from '../../shared/services/gouvernorat.service';


@Component({
  selector: 'app-gouvernorat',
  templateUrl: './gouvernorat.component.html',
  styleUrls: ['./gouvernorat.component.scss']
})
export class GouvernoratComponent implements OnInit {


  gouvernorats: Gouvernorat[] = [];
  display = false;
  gouvernorat = new Gouvernorat();

  constructor(private gouvernoratService: GouvernoratService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.gouvernoratService.getAll().subscribe(data => {
      this.gouvernorats = data;
    }, ex => console.log(ex));
  }

  clickAdd(): void {
    this.gouvernorat = new Gouvernorat();
    this.display = true;
  }

  edit(): void {
    this.gouvernoratService.save(this.gouvernorat).subscribe(res => {
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
    this.gouvernoratService.save(this.gouvernorat).subscribe(res => {
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
    if (this.gouvernorat.id) {
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
        this.gouvernoratService.delete(id).subscribe(res => {
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

  clickEdit(gouv: Gouvernorat): void {
    this.display = true;
    Object.assign(this.gouvernorat, gouv);
  }


}
