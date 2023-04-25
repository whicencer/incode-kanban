import { toast } from "react-toastify";
import { IGithubApi } from "../../typings/IGithubApi";

export const useGetRepo = (api: IGithubApi, owner: string, repo: string) => {
  return () => {
    api.getRepo(owner, repo)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => {
        if (data.message) {
          toast.error('404 Not Found');
        }
        console.log(data);
      })
      .catch(console.log);
  };
};