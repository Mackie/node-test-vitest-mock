export class Repo {
  private token: string;
  constructor(token: string) {
    this.token = token;
  }

  public getToken() {
    return this.token;
  }

  public getAnotherToken() {
    return "another token";
  }
}
