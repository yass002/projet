import { Component, OnInit } from '@angular/core';
import {Groupe} from '../../shared/model/groupe';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Type} from '../../shared/model/type';
import {TypeService} from '../../shared/services/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  types: Type[] = [];
  display = false;
  type = new Type();

  constructor(private typeService: TypeService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.typeService.getAll().subscribe(data => {
      this.types = data;
      console.log(data);
    }, ex => console.log(ex));
  }

  clickAdd(): void {
    this.type = new Type();
    this.display = true;
  }

  edit(): void {
    this.typeService.save(this.type).subscribe(res => {
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
    this.typeService.save(this.type).subscribe(res => {
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
    if (this.type.id) {
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
        this.typeService.delete(id).subscribe(res => {
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

  clickEdit(type: Groupe): void {
    this.display = true;
    Object.assign(this.type, type);
  }


}
