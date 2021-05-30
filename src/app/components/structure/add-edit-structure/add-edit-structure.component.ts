import {Component, OnInit} from '@angular/core';
import {Structure} from '../../../shared/model/structure';
import {StructureService} from '../../../shared/services/structure.service';
import {MessageService, TreeNode} from 'primeng/api';
import {GouvernoratService} from '../../../shared/services/gouvernorat.service';
import {DelegationService} from '../../../shared/services/delegation.service';
import {Gouvernorat} from '../../../shared/model/gouvernorat';
import {Delegation} from '../../../shared/model/delegation';
import {Type} from '../../../shared/model/type';
import {TypeService} from '../../../shared/services/type.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-edit-structure',
  templateUrl: './add-edit-structure.component.html',
  styleUrls: ['./add-edit-structure.component.scss']
})
export class AddEditStructureComponent implements OnInit {
  title = 'Ajouter structure';
  structure = new Structure();
  structures: Structure[] = [];
  // childStructures: Structure[] = [];
  gouvernorats: Gouvernorat[] = [];
  delegations: Delegation[] = [];
  types: Type[] = [];
  typ = Type;
  selectedGouvernorat: Gouvernorat;
  /*  childrens: any[] = [];
    selectedParent: Structure;
    selectedChild: Structure;*/
  nodes: TreeNode[];
  selectedFiles: TreeNode[] = [];
  idStruct: any;

  constructor(private structureService: StructureService,
              private messageService: MessageService,
              private gouvernoratService: GouvernoratService,
              private delegationService: DelegationService,
              private typeService: TypeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.getParent();
    this.getAllGouvernorat();
    this.getAllTypes();
    this.getStructure();
    this.idStruct = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.idStruct) {
      this.getById();
    }
  }

  getById(): void {
    this.structureService.getById(this.idStruct).subscribe(
      res => {
        this.structure = res;
        this.selectedGouvernorat = this.structure.delegation.gouvernorat;
        this.getDelegationByGouvernorat();
        //  if (this.structure.parent) {
        this.nodes.forEach(node => {
          this.expandRecursive(node, true);
          this.selectableRecursive(node, this.structure.id);
        });
        const treeNode: TreeNode = {key: this.structure.parent.id, label: this.structure.parent.id};
        this.selectedFiles = [treeNode];
        //   }
        this.structure.parent = null;
      }, ex => console.log(ex)
    );
  }

  getStructure(): void {

    this.structureService.getStructure().subscribe(res => {
      this.nodes = res;
    }, ex => console.log(ex));
  }

  getAllGouvernorat(): void {
    this.gouvernoratService.getAll().subscribe(res => {
      this.gouvernorats = res;
    }, ex => console.log(ex));
  }

  /* getParent(): void {
     this.structureService.getParent().subscribe(res => {
       this.structures = res;
     }, ex => console.log(ex));
   }*/

  /*
    getByParent(): void {
      this.childrens = [];
      this.structureService.getByParent(this.selectedParent.id).subscribe(res => {
        //  this.childStructures = res;
        if (res.length > 0) {
          this.childrens.push(res);
          console.log(this.childrens);
        }

      }, ex => console.log(ex));
    }
  */

  /*  getByChild(id: any): void {
      console.log(id);
      this.structureService.getByParent(id).subscribe(res => {
        if (res.length > 0) {
          this.childrens.push(res);
        }

      }, ex => console.log(ex));
    }*/

  getAllTypes(): void {
    this.typeService.getAll().subscribe(data => {
      this.types = data;
      console.log(data);
    }, ex => console.log(ex));
  }

  getDelegationByGouvernorat(): void {
    this.delegationService.getByGouvernorat(this.selectedGouvernorat.id).subscribe(res => {
      this.delegations = res;
    }, ex => console.log(ex));
  }

  edit(): void {
    this.structureService.update(this.structure).subscribe(res => {
      if (res.success) {
        this.messageService.add({severity: 'success', summary: res.message, detail: res.detail});
        this.router.navigate(['/structure']);
      } else {
        this.messageService.add({severity: 'warn', summary: res.message, detail: res.detail});
      }
    }, ex => {
      this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
      console.log(ex);
    });
  }

  add(): void {

    this.structureService.save(this.structure).subscribe(res => {
      if (res.success) {
        this.messageService.add({severity: 'success', summary: res.message, detail: res.detail});
        this.router.navigate(['/structure']);
      } else {
        this.messageService.add({severity: 'warn', summary: res.message, detail: res.detail});
      }
    }, ex => {
      this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
      console.log(ex);
    });
  }

  valider(): void {
    if (this.selectedFiles[0]) {
      const parent = new Structure();
      parent.id = this.selectedFiles[0].key;
      this.structure.parent = parent;
    }
    if (this.structure.id) {
      this.edit();
    } else {
      this.add();
    }
  }

  annuler(): void {

  }

  onSelectNode(event: any): any {
    this.selectedFiles = [];
    // console.log(event);
    this.selectedFiles.push(event.node);
  }

  onUnSelectNode(event: any): any {
    this.selectedFiles = [];
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  private expandRecursive(node: TreeNode, isExpand: boolean): void {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  private selectableRecursive(node: TreeNode, id: any): void {
    if (node.key === id) {
      node.selectable = false;
      return;
    }
    if (node.children) {
      node.children.forEach(childNode => {
        this.selectableRecursive(childNode, id);
      });
    }
  }
}
