/* eslint-disable react-refresh/only-export-components */
import { Form } from './components/Form';
import { Repository } from './components/Repository';
import { useTypedSelector } from './hooks/useTypedSelector';
import { githubApiProvider } from './providers/githubApiProvider';
import { IGithubApi } from './typings/IGithubApi';
import {useGetRepo} from "./components/Form/hooks.ts";

interface Props {
  api: IGithubApi
}

const App: React.FC<Props> = ({ api }) => {
  const { issues, name, owner } = useTypedSelector(state => state.repo);
  const getRepo = useGetRepo();

  return (
    <>
      <Form getRepo={getRepo} api={api} />
      {
        name != ''
          ? <Repository issues={issues} name={name} owner={owner} />
          : 'There is no current repository'
      }
    </>
  );
};

export default githubApiProvider(App);