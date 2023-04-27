import { RepoIssue } from '../../typings/IRepo';
import styles from './styles.module.scss';

interface Props {
  issue: RepoIssue;
  status: string;
}

export const Item: React.FC<Props> = ({ issue }) => {
  const createdAt = new Date(issue.created_at);
  const formatDate = `${createdAt.getDate()}.${createdAt.getMonth()+1}.${createdAt.getFullYear()}`;

  return (
    <div className={styles.item}>
      <h4>{issue.title}</h4>
      <span>#{issue.id} | Created at {formatDate}</span>
    </div>
  );
};