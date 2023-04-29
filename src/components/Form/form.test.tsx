import {fireEvent, render} from "@testing-library/react";
import {Form} from "./index.tsx";
import {GithubApi} from "../../services/githubApi.ts";
import {Provider} from "react-redux";
import {store} from "../../store";

describe('Form', () => {
  const api = new GithubApi();

  it('Input with specified placeholder is displaying', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Form api={api} />
      </Provider>
    );

    const placeholder = getByPlaceholderText('GitHub repo URL');
    expect(placeholder).toBeVisible();
  });

  it('Input value changes on typing', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Form api={api} />
      </Provider>
    );

    const inputElement= getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, {target: {value: '23'}});
    console.log(inputElement.value);
    expect(inputElement.value).toBe('23');
  });
});