import { useState } from 'react';
import { IGithubApi } from '../../typings/IGithubApi';
import styles from './styles.module.scss';

interface Props {
  api: IGithubApi;
  getRepo: (api: IGithubApi, owner: string, repo: string) => void;
}

export const Form: React.FC<Props> = ({ api, getRepo}) => {
  const [link, setLink] = useState('');

  const splittedLink = link.split('/');
  const repo = splittedLink[splittedLink.length-1];
  const owner = splittedLink[splittedLink.length-2];

  return (
    <div className={styles.form}>
      <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="GitHub repo URL" type="text" />
      <button onClick={() => getRepo(api, owner, repo)}>Load issues</button>
    </div>
  );
};
