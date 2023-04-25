export class GithubApi {
  private readonly baseUrl = 'https://api.github.com';

  async getRepo (owner: string, repo: string) {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/issues`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}