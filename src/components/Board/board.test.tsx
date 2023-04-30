/* eslint-disable @typescript-eslint/no-empty-function */
import {fireEvent, render, screen} from '@testing-library/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Board } from './index';
import { IRepo } from '../../typings/IRepo';

describe('Board', () => {
  const columnId = 'test-columnId';
  const column = {
    title: 'Test column',
    items: [
      { assignee: null, assignees: [], closed_at: null, created_at: new Date(), node_id: 'I_wer23', title: 'Test' }
    ] as IRepo,
  };

  beforeEach(() => {
    render(
      <DragDropContext onDragEnd={() => {}}>
        <Board column={column} columnId={columnId} />
      </DragDropContext>
    );
  });

  it('renders the column title', () => {
    const titleElement = screen.getByText(column.title);
    expect(titleElement).toBeVisible();
  });

  it('renders the list of items', () => {
    column.items?.forEach(item => {
      const listItem = screen.getByText(item.title);
      expect(listItem).toBeVisible();
    });
  });

  it('renders Empty if items length is 0', () => {
    const columnWithEmptyItems = {
      title: 'Test column',
      items: [] as IRepo,
    };

    render(
      <DragDropContext onDragEnd={() => {}}>
        <Board column={columnWithEmptyItems} columnId={columnId} />
      </DragDropContext>
    );

    const emptyText = screen.getByText('Empty');
    expect(columnWithEmptyItems.items?.length).toBe(0);
    expect(emptyText).toBeVisible();
  });

  it('On dragstart board background color should be lightblue', async () => {
    const {container} = render(
      <DragDropContext onDragEnd={() => {}}>
        <Board column={column} columnId={columnId} />
      </DragDropContext>
    );

    const board = container.querySelector('div');
    const draggableItem = board?.querySelector('div');
    if (draggableItem) {
      fireEvent.mouseDown(draggableItem, { clientX: 0, clientY: 0 });
      fireEvent.mouseMove(draggableItem, { clientX: 100, clientY: 100 });
    }

    expect(board).toHaveStyle('background: lightblue');
  });
});