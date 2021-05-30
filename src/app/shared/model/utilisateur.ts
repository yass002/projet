import {Groupe} from './groupe';

export class Utilisateur{
  id: number;
  nom: string;
  prenom: string;
  username: string;
  cnrsp: string;
  cin: string;
  grade: string;
  fonction: string;
  mail: string;
  adresse: string;
  tel: string;
  date: Date;
  position: string;
  groupe: Groupe;


}
