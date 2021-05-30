import { Component, OnInit } from '@angular/core';
import {PrevilegeService} from '../../shared/services/previlege.service';
import {Previlege} from '../../shared/model/previlege';
import {ConfirmationService, MessageService} from 'primeng/api';


@Component({
  selector: 'app-previlege',
  templateUrl: './previlege.component.html',
  styleUrls: ['./previlege.component.scss']
})
export class PrevilegeComponent implements OnInit {

  constructor(private previlegeService: PrevilegeService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
  ) { }
  previleges: Previlege[] = [];
  display = false;
  previlege = new Previlege();

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    this.previlegeService.getall().subscribe(data => {
      this.previleges = data;
    }, ex => console.log(ex));
  }
  clickAdd(): void {
    this.previlege = new Previlege();
    this.display = true;
  }
  valider(): void {
    if (this.previlege.id) {
      this.edit();
    } else {
      this.add();
    }
  }

  edit(): void {
    this.previlegeService.save(this.previlege).subscribe(res => {
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
    this.previlegeService.save(this.previlege).subscribe(res => {
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

  remove(event: Event, id: any): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Vous etes sur de supprimer?',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.previlegeService.delete(id).subscribe(res => {
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
  clickEdit(prev: Previlege): void {
    this.display = true;
    Object.assign(this.previlege, prev);
  }
}
