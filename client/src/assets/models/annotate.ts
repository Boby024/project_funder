import {CommentModel} from './comment';

export interface Annotate {
  userId: number;
  user: string; // username
  project: number;
  comment: number;
  comments: CommentModel[];
}
