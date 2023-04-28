/* eslint-disable @typescript-eslint/no-empty-function */
import { DragDropContext } from 'react-beautiful-dnd';
import { Board } from './index';
import { render } from '@testing-library/react';
import { IRepo } from '../../typings/IRepo';

describe('Board', () => {
  const columnId = 'test-columnId';
  const column = {
    title: 'Test column',
    items: [
      { assignee: null, assignees: [], closed_at: null, created_at: new Date(), node_id: 'I_wer23', title: 'Test' }
    ] as IRepo,
  };

  it('renders the column title', () => {
    const { getByText } = render(
      <DragDropContext onDragEnd={() => {}}>
        <Board column={column} columnId={columnId} />
      </DragDropContext>
    );
    const titleElement = getByText(column.title);
    expect(titleElement).toBeVisible();
  });

  it('renders the list of items', () => {
    const { getByText } = render(
      <DragDropContext onDragEnd={() => {}}>
        <Board column={column} columnId={columnId} />
      </DragDropContext>
    );
    column.items?.forEach(item => {
      const listItem = getByText(item.title);
      expect(listItem).toBeVisible();
    });
  });

  it('renders Empty if items length is 0', () => {
    const columnWithEmptyItems = {
      title: 'Test column',
      items: [] as IRepo,
    };

    const { getByText } = render(
      <DragDropContext onDragEnd={() => {}}>
        <Board column={columnWithEmptyItems} columnId={columnId} />
      </DragDropContext>
    );
    const emptyText = getByText('Empty');
    expect(columnWithEmptyItems.items?.length).toBe(0);
    expect(emptyText).toBeVisible();
  });

  // it('Board background turning lightblue on dragging', () => {});
});