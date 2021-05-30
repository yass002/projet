import {Delegation} from './delegation';
import {Type} from './type';

export class Structure{
  id: any;
  nom: string;
  code: number;
  acronyme: string;
  adresse: string;
  mail: string;
  tel: string;
  rue: string;
  codePostal: number;
  siteWeb: string;
  parent: Structure;
  delegation: Delegation;
  type: Type;
}
