export interface IGithubApi {
  getRepo: (owner: string, repo: string) => Promise<unknown>;
}