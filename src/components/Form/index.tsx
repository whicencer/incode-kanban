import { useState } from 'react';
import { IGithubApi } from '../../typings/IGithubApi';
import styles from './styles.module.scss';
import { useGetRepo } from './hooks';
// import { toast } from 'react-toastify';

interface Props {
  api: IGithubApi
}

export const Form: React.FC<Props> = ({ api }) => {
  const [link, setLink] = useState('');

  const splittedLink = link.split('/');
  const repo = splittedLink[splittedLink.length-1];
  const owner = splittedLink[splittedLink.length-2];
  const getRepo = useGetRepo(api, owner, repo);

  return (
    <div className={styles.form}>
      <input onChange={(e) => setLink(e.target.value)} type="text" />
      <button onClick={getRepo}>Load issues</button>
    </div>
  );
};