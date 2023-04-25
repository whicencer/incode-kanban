import { useDrop } from 'react-dnd';
import { Item } from '../Item';
import styles from './styles.module.scss';
import { Drop, Map, Props } from './typings';

export const Board: React.FC<Props> = ({ board, setOpen, setClosed, setProgress }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'issue',
    drop: (item: Drop) => addItemToSection(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    }),
  }));

  const statusMap: Map = {
    todo: {
      updateList: setOpen,
      listName: 'open'
    },
    progress: {
      updateList: setProgress,
      listName: 'progress'
    },
    done: {
      updateList: setClosed,
      listName: 'closed'
    }
  };

  const addItemToSection = (item: Drop) => {
    const { status } = item;
    const { updateList } = statusMap[status];
  
    if (status === 'todo' || status === 'progress' || status === 'done') {
      updateList(prevList => {
        return prevList.filter(issue => issue.id !== item.issue.id);
      });
  
      if (board.status !== status) {
        const targetList = statusMap[board.status].updateList;
        targetList(prevList => [item.issue, ...prevList]);
      } else {
        updateList(prevList => {
          return [item.issue, ...prevList];
        });
      }
    }
  };

  return (
    <div ref={drop} className={styles.container}>
      <h3>{board.title}</h3>
      <div style={{ backgroundColor: isOver ? '#afafaf' : '#ebebeb' }} className={styles.board}>
        {
          board.items?.map(issue => {
            return <Item key={issue.id} status={board.status} issue={issue} />;
          })
        }
      </div>
    </div>
  );
};