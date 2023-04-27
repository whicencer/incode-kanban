import { IRepo, RepoIssue } from "../../typings/IRepo";

export interface Props {
  owner: string;
  name: string;
  issues: IRepo;
}

export interface Destination {
  index:       number;
  droppableId: string;
}

interface IColumn {
  title: string;
  items: RepoIssue[];
}

export type IColumns = Record<string, IColumn>;