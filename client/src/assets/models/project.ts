export interface Project {
  identifier: number;
  title: string;
  description: string;
  status: string;
  fundinglimit: number;
  creatorId: number;
  predecessor: number;
  categorieId: number;
  createddate: string;
  image?: any;
  user?: string;
  project?: Project[];
}
