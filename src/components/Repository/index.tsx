import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { IRepo } from '../../typings/IRepo';
// import { Board } from '../Board';
import styles from './styles.module.scss';

interface Props {
  owner: string,
  name: string,
  issues: IRepo
}

export interface Result {
  draggableId: string;
  type:        string;
  source:      Destination;
  reason:      string;
  mode:        string;
  destination: Destination;
  combine:     null;
}

export interface Destination {
  index:       number;
  droppableId: string;
}

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

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns(() => {
        const updatedColumns = {
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        };
        localStorage.setItem(`${name}_${owner}`, JSON.stringify(updatedColumns));
        return updatedColumns;
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns(() => {
        const updatedColumns = {
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        };
        localStorage.setItem(`${name}_${owner}`, JSON.stringify(updatedColumns));
        return updatedColumns;
      });
    }
  };

  return (
    <>
      <span>{owner} {'>'} {name}</span>
      <div className={styles.boardsBlock}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {
            Object.entries(columns).map(([columnId, column]) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          background: snapshot.isDraggingOver ? 'lightblue' : '#efefef',
                          padding: 10,
                          border: '2px solid black',
                          width: 250,
                          margin: '10px 10px 0 10px'
                        }}
                        >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.node_id} draggableId={item.node_id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: 50,
                                      background: snapshot.isDragging ? '#efefef' : '#e3e3e3',
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    { item.title }
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              );
            })
          }
        </DragDropContext>
      </div>
    </>
  );
};