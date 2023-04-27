import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';
import { Board } from '../Board';
import { Props } from './typings';
import { onDragEnd } from './helpers';
import styles from './styles.module.scss';

export const Repository: React.FC<Props> = ({ name, owner, issues }) => {
  const todo = issues?.filter(issue => !issue.assignees.length) ?? [];
  const progress = issues?.filter(issue => issue.assignees.length) ?? [];
  const done = issues?.filter(issue => issue.closed_at) ?? [];
  
  useEffect(() => {
    const savedData = localStorage.getItem(`${name}_${owner}`);
    if (savedData !== null) {
      setColumns(JSON.parse(savedData));
    }
  }, [name, owner]);

  const [columns, setColumns] = useState({
    [uuid()]: {
      title: 'To-do',
      items: todo,
    },
    [uuid()]: {
      title: 'In Progress',
      items: progress,
    },
    [uuid()]: {
      title: 'Done',
      items: done,
    },
  });

  return (
    <>
      <span>{owner} {'>'} {name}</span>
      <div className={styles.boardsBlock}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns, name, owner)}>
          {
            Object.entries(columns).map(([columnId, column]) => {
              return (
                <Board key={columnId} column={column} columnId={columnId} />
              );
            })
          }
        </DragDropContext>
      </div>
    </>
  );
};