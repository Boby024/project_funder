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

export class ProjectClass implements Project{
  categorieId: number;
  createddate: string;
  creatorId: number;
  description: string;
  fundinglimit: number;
  identifier: number;
  image: any;
  predecessor: number;
  project: Project[];
  status: string;
  title: string;
  user: string;

  // constructor() {}

}
