import {Profilimage} from './profilimage';

export interface DetailByUsername {
  id: number;
  username: string;
  profilimage?: Profilimage;
}
