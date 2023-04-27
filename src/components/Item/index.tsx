import { Draggable } from 'react-beautiful-dnd';
import { RepoIssue } from '../../typings/IRepo';

interface Props {
  issue: RepoIssue;
  index: number;
}

export const Item: React.FC<Props> = ({ issue, index }) => {
  const createdAt = new Date(issue.created_at);
  const formatDate = `${createdAt.getDate()}.${createdAt.getMonth()+1}.${createdAt.getFullYear()}`;

  return (
    <Draggable index={index} draggableId={issue.node_id}>
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
            <h4>{ issue.title }</h4>
            <p>{formatDate}</p>
          </div>
        );
      }}
    </Draggable>
  );
};