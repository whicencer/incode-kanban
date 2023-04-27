import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { IGithubApi } from "../../typings/IGithubApi";
import { setCurrentRepo } from "../../store/slices/repo";

export const useGetRepo = (api: IGithubApi, owner: string, repo: string) => {
  const dispatch = useDispatch();

  return () => {
    api.getRepo(owner, repo)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => {
        if (data.message) {
          toast.error('404 Not Found');
        } else {
          dispatch(setCurrentRepo({ issues: data, name: repo, owner }));
        }
      })
      .catch(console.log);
  };
};