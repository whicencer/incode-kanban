import { Dispatch, SetStateAction } from 'react';
import { IRepo, RepoIssue } from "../../typings/IRepo";

export interface Props {
  board: {
    id: number;
    title: string;
    items: IRepo;
    status: string;
  };
  setOpen: Dispatch<SetStateAction<RepoIssue[]>>;
  setProgress: Dispatch<SetStateAction<RepoIssue[]>>;
  setClosed: Dispatch<SetStateAction<RepoIssue[]>>;
}

export type Map = {
  [key: string]: {
    updateList: Dispatch<SetStateAction<RepoIssue[]>>,
    listName: string
  }
};

export interface Drop {
  issue: RepoIssue,
  status: string
}