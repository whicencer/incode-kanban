/* eslint-disable @typescript-eslint/no-explicit-any */
export type IRepo = RepoIssue[] | null;
export interface RepoIssue {
  node_id:                  string;
  title:                    string;
  assignee:                 null;
  assignees:                any[];
  created_at:               Date;
  closed_at:                null;
}