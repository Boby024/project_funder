export interface Project {
  identifier: number;
  title: string;
  description: string;
  status: string;
  fundinglimit: number;
  creatorId: string;
  predecessor: number;
  categorieId: number;
  createddate: string;
  image?: any;
}
