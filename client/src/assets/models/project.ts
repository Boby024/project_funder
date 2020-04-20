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
  user?: string;
  project?: Project[];
}

class ProjectClass implements Project{
  private _categorieId: number;
  private _createddate: string;
  private _creatorId: string;
  private _description: string;
  private _fundinglimit: number;
  private _identifier: number;
  private _image: any;
  private _predecessor: number;
  private _project: Project[];
  private _status: string;
  private _title: string;
  private _user: string;

  constructor() {}

  get categorieId(): number {
    return this._categorieId;
  }

  set categorieId(value: number) {
    this._categorieId = value;
  }

  get createddate(): string {
    return this._createddate;
  }

  set createddate(value: string) {
    this._createddate = value;
  }

  get creatorId(): string {
    return this._creatorId;
  }

  set creatorId(value: string) {
    this._creatorId = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get fundinglimit(): number {
    return this._fundinglimit;
  }

  set fundinglimit(value: number) {
    this._fundinglimit = value;
  }

  get identifier(): number {
    return this._identifier;
  }

  set identifier(value: number) {
    this._identifier = value;
  }

  get image(): any {
    return this._image;
  }

  set image(value: any) {
    this._image = value;
  }

  get predecessor(): number {
    return this._predecessor;
  }

  set predecessor(value: number) {
    this._predecessor = value;
  }

  get project(): Project[] {
    return this._project;
  }

  set project(value: Project[]) {
    this._project = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }
}
