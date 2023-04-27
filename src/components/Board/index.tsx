import { IRepo } from '../../typings/IRepo';
import { Item } from '../Item';
import styles from './styles.module.scss';

interface Props {
  title: string;
  issues: IRepo;
}

export const Board: React.FC<Props> = ({ title, issues }) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.board}>
        {
          issues?.map(issue => {
            const issueStatus = issue.assignees.length ? 'progress' : issue.closed_at ? 'done' : 'todo';
            return <Item key={issue.node_id} status={issueStatus} issue={issue} />;
          })
        }
      </div>
    </div>
  );
};