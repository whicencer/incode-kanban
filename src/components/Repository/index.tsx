import { useState } from 'react';
import { IRepo } from '../../typings/IRepo';
import { Board } from '../Board';
import styles from './styles.module.scss';

interface Props {
  owner: string,
  name: string,
  issues: IRepo
}

export const Repository: React.FC<Props> = ({ name, owner, issues }) => {

  const [open, setOpen] = useState(issues?.filter(issue => issue.assignees.length === 0) ?? []);
  const [progress, setProgress] = useState(issues?.filter(issue => issue.assignees.length !== 0) ?? []);
  const [closed, setClosed] = useState(issues?.filter(issue => issue.closed_at !== null) ?? []);
  
  const boards = [
    { id: 1, title: 'To-Do', items: open, status: 'todo' },
    { id: 2, title: 'In Progress', items: progress, status: 'progress' },
    { id: 3, title: 'Done', items: closed, status: 'done' },
  ];

  return (
    <>
      <span>{owner} {'>'} {name}</span>
      <div className={styles.boardsBlock}>
        {
          boards.map(board => {
            return <Board key={board.id} board={board} setOpen={setOpen} setProgress={setProgress} setClosed={setClosed} />;
          })
        }
      </div>
    </>
  );
};