import { Component, OnInit } from '@angular/core';
import {Role} from '../../shared/model/role';
import {RoleService} from '../../shared/services/role.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Previlege} from '../../shared/model/previlege';
import {PrevilegeService} from '../../shared/services/previlege.service';
import {logging} from 'selenium-webdriver';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor(private roleService: RoleService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private previlegeService: PrevilegeService) {
}
  roles: Role[] = [];
  display = false;
  displayrole = false;
  role = new Role();
  previleges: Previlege[];
  selectedPrevilege: Previlege[];
  ngOnInit(): void {
    this.getall();
    this.getlAllPrevilege();
  }
  clickAdd(): void {
    this.role = new Role();
    this.display = true;
  }
  getlAllPrevilege(): void{
    this.previlegeService.getall().subscribe(
      (res) => {
        this.previleges = res;
        },
        ex => {console.log(ex); }
        );
  }
  getall(): void {
    this.roleService.getAll().subscribe(
      (data) => {
        this.roles = data;
      },
      (err) => {console.log(err); }
    );
  }

  remove(event: Event , id: any): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Vous etes sur de supprimer?',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roleService.delete(id).subscribe(res => {
          if (res.success) {
            this.display = false;
            this.getall();
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
  edit(): void {
    this.roleService.save(this.role).subscribe(res => {
      if (res.success) {
        this.display = false;
        this.getall();
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
    this.roleService.save(this.role).subscribe(res => {
      if (res.success) {
        this.display = false;
        this.getall();
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
    if (this.role.Id) {
      this.edit();
    } else {
      this.add();
    }
  }
  affecter(): void {
    this.role.previleges = this.selectedPrevilege;
    this.roleService.save(this.role).subscribe(res => {
      if (res.success) {
        this.displayrole = false;
        this.getall();
        this.messageService.add({severity: 'success', summary: res.message, detail: res.detail});
      } else {
        this.messageService.add({severity: 'warn', summary: res.message, detail: res.detail});
      }
    }, ex => console.log(ex));
  }
  clickEdit(role: Role): void {
    this.display = true;
    Object.assign(this.role, role);
  }

  clickrole(role: Role): void {
    this.displayrole = true;
    Object.assign(this.role, role )  ;
    this.selectedPrevilege = this.role.previleges;

  }
}
