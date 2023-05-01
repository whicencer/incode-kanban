import {render} from "@testing-library/react";
import {githubApiProvider} from "./githubApiProvider.tsx";
import {GithubApi} from "../services/githubApi.ts";

describe('Providers', () => {
  describe('GithubApiProvider', () => {
    it('Component prop api should be instance of GithubApi', () => {
      const ComponentWithApi = githubApiProvider((props) => {
        expect(props.api instanceof GithubApi).toBeTruthy();
        return <div>Test Component</div>;
      });

      const { getByText } = render(<ComponentWithApi />);
      expect(getByText('Test Component')).toBeVisible();
    });
  });
});