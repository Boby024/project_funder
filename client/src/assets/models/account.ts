import {User} from './user';
import {Profilimage} from './profilimage';

export interface Account {
  owner: number;
  credit: number;
  secretnumber: string;
  user: User;
  profilimage?: Profilimage;
}
