/* eslint-disable react-refresh/only-export-components */
import { Form } from './components/Form';
import { githubApiProvider } from './providers/githubApiProvider';
import { IGithubApi } from './typings/IGithubApi';

interface Props {
  api: IGithubApi
}

const App: React.FC<Props> = ({ api }) => {
  return (
    <>
      <Form api={api} />
    </>
  );
};

export default githubApiProvider(App);