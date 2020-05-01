import {Profilimage} from './profilimage';

export interface Loginstoreddata {
  id: number;
  username: string;
  profilimage?: Profilimage;
  right: string;
}
