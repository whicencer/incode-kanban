import { useDrag } from 'react-dnd';
import { RepoIssue } from '../../typings/IRepo';
import styles from './styles.module.scss';

interface Props {
  issue: RepoIssue;
  status: string;
}

export const Item: React.FC<Props> = ({ issue, status }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'issue',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    item: {issue, status},
  }));
  const createdAt = new Date(issue.created_at);
  const formatDate = `${createdAt.getDate()}.${createdAt.getMonth()+1}.${createdAt.getFullYear()}`;

  return (
    <div
      ref={drag}
      className={styles.item}
      style={{ opacity: isDragging ? '0%' : '100%' }}
    >
      <h4>{issue.title}</h4>
      <span>#{issue.id} | Created at {formatDate}</span>
    </div>
  );
};