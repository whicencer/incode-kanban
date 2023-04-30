import {vi} from 'vitest';
import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {Form} from "./index.tsx";
import {GithubApi} from "../../services/githubApi.ts";
import {store} from "../../store";

describe('Form', () => {
  const api = new GithubApi();
  const getRepo = vi.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Form getRepo={getRepo} api={api} />
      </Provider>
    );
  });

  it('Input with specified placeholder is displaying', () => {
    const placeholder = screen.getByPlaceholderText('GitHub repo URL');
    expect(placeholder).toBeVisible();
  });

  it('Input value changes on typing', () => {
    const inputElement= screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, {target: {value: '23'}});
    console.log(inputElement.value);
    expect(inputElement.value).toBe('23');
  });

  it('Load issues button is displaying', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Load issues');
    expect(button).toBeVisible();
  });

  it('Input value changes on typing and when button clicked - getRepo should be called with right args', async () => {
    const link = 'https://github.com/facebook/react';

    const button = await screen.getByRole('button');
    const input = await screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: link } });
    fireEvent.click(button);
    expect(getRepo).toHaveBeenCalledWith(api, 'facebook', 'react');
  });
});