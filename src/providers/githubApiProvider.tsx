import { ComponentType } from "react";
import { GithubApi } from "../services/githubApi";
import { IGithubApi } from "../typings/IGithubApi";

interface Props {
  api: IGithubApi
}

export const githubApiProvider = (Component: ComponentType<Props>) => (): React.ReactElement => {
  const api = new GithubApi();
  return <Component api={api} />;
};