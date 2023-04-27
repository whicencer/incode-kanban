import { Droppable } from 'react-beautiful-dnd';
import { IRepo } from '../../typings/IRepo';
import { Item } from '../Item';

interface Props {
  columnId: string;
  column: {
    items: IRepo;
    title: string;
  };
}

export const Board: React.FC<Props> = ({ column, columnId }) => {
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
            <h3>{column.title}</h3>
            {
              column.items?.length
                ? column.items?.map((item, index) => {
                    return (
                      <Item index={index} issue={item} key={item.node_id} />
                    );
                  })
                : <p>Empty</p>
            }
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};